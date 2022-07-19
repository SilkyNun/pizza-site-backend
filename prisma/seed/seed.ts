import { Additive, Addon, Prisma, PrismaClient, PrismaPromise, User } from "@prisma/client"
import { hash, hashSync } from "bcrypt";
import { CreateAdditiveDto } from "src/additive/dto/create-additive.dto";
import { CreateAddonDto } from "src/addon/dto/create-addon.dto";
import { CreateOrderDto } from "src/order/dto/create-order.dto";
import { CreatePizzaDto } from "src/pizza/dto/create-pizza.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { Additives, Addons, Pizzas } from "./seed-data";
import { createOrders, createPizzas, createUsers, transformPizzaDto } from "./seed-methods";

const prisma = new PrismaClient();

const insertAddons = (addonsInput: Array<CreateAddonDto>): Promise<Addon[]> => {
    const prismaPromises =  addonsInput
        .map(input => prisma.addon.create({
            data: {...input}
        }));
    return prisma.$transaction(prismaPromises);
}

const insertAdditives = (additiveDtos: Array<CreateAdditiveDto>): Promise<Additive[]> => {
    const primsaPromises = additiveDtos
        .map(dto => prisma.additive.create({
            data: {...dto}
        }));
    return prisma.$transaction(primsaPromises);
}

const insertUsers = (usersDtos: Array<CreateUserDto>): Promise<User[]> => {
    const prismaPromises = usersDtos
        .map((dto) => {
            const hashed = hashSync(dto.password, 10);
            return prisma.user.create({
                data: {
                    ...dto,
                    password: hashed
                }
            })
        });
    return prisma.$transaction(prismaPromises);
}

const insertPizzas = (pizzasDto: Array<CreatePizzaDto>): Promise<any> => {
    const prismaPromises = pizzasDto
        .map(dto => {
            const {addonInputs, ingredientInputs, variantInputs} = transformPizzaDto(dto);
            return prisma.pizza.create({
                data: {
                  type: dto.type,
                  name: dto.name,
                  variants: {
                    createMany: {
                      data: variantInputs
                    }
                  },
                  ingredients: {
                    createMany: {
                      data: ingredientInputs
                    }
                  },
                  addons: {
                    connectOrCreate: addonInputs
                  }
                },
                include: {
                  variants: true,
                  ingredients: true,
                  addons: true
                }
              })
        });
    return prisma.$transaction(prismaPromises);
}

const insertOrders = (orderDtos: Array<CreateOrderDto>, userId: number): Promise<any> => {
    const prismaPromises = orderDtos
        .map(dto => {
            const {additives, selectedPizzas} = dto;
            const selectedPizzaInputs =  selectedPizzas.map(pizza => {
                const {ingredients, addons, ...pizzaInfo} = pizza;
                const input: Prisma.SelectedPizzaCreateWithoutOrderInput = {
                    ...pizzaInfo,
                    ingredients: {
                      connect: ingredients.map(id => {return {id}})
                    },
                    addons: {
                      connect: addons.map(id => {return {id}})
                    },
                }
                return input;
            });
            return prisma.order.create({
                data: {
                  userId,
                  additives: {
                    connect: additives.map(a => {return {id: a}})
                  },
                  pizzas: {
                    create: selectedPizzaInputs
                  }
                },
                include: {
                    pizzas: {
                        include: {
                            addons: true,
                            ingredients: true
                        }
                    },
                    additives: true,
                }
              })
        });
    return prisma.$transaction(prismaPromises);
} 

async function main() {
    const addons = await insertAddons(Addons);
    const additives = await insertAdditives(Additives);
    const users = await insertUsers(createUsers(10));
    const pizzas = await insertPizzas(createPizzas(Pizzas.length, Addons));
    users
        .forEach(user => insertOrders(createOrders(3, additives, pizzas), user.id));
}

main()
    .finally(async () => {
        prisma.$disconnect();
    })

