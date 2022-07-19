import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { CreateAdditiveDto } from "src/additive/dto/create-additive.dto";
import { CreateAddonDto } from "src/addon/dto/create-addon.dto";
import { CreateIngredientDto } from "src/ingredient/dto/create-ingredient.dto";
import { CreateOrderDto } from "src/order/dto/create-order.dto";
import { CreatePizzaDto } from "src/pizza/dto/create-pizza.dto";
import { CreateSelectedPizzaDto } from "src/selected-pizza/dto/create-selected-pizza.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { CreateVariantDto } from "src/variant/dto/create-variant.dto";
import { PizzaImage, Ingredients, Size, Dough, Addons, Pizzas, Additives, Type } from "./seed-data";

export const randomUser = (): CreateUserDto => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.city(),
        email: faker.internet.email(),
        tel: faker.phone.number('+37529#######'),
        username: faker.internet.userName(),
        password: faker.internet.password(15,true,/[a-zA-Z0-9]/),
        roles: ['USER']
    };
}


export const createVariant = (dough: string, size: number): CreateVariantDto => {
    return {
        dough,
        size,
        image: PizzaImage,
        price: Number(faker.commerce.price(20,40, 2)),
        weight: Math.round((Math.random() * 300 + 400))
    }
}

export const createIngredients = (count: number): Array<CreateIngredientDto> => {
    return Ingredients.sort(() => 0.5 - Math.random()).slice(0, count).map((name): CreateIngredientDto => {
        return {
            name,
            required: Boolean(Math.round(Math.random()))
        }
    })
}

export const createVariants = (): Array<CreateVariantDto> => {
    const sizes = Object.values(Size).filter(x => !Number.isNaN(Number(x)));
    const variants: Array<CreateVariantDto> = [];
    Object.values(Dough).forEach(dough => {
        const variantsInner = sizes.map(size => {
            return createVariant(dough, Number(size));  
        });
        variants.push(...variantsInner);
    });
    return variants;
}

export const createAddons = (count: number): Array<CreateAddonDto> => {
    const addons: Array<CreateAddonDto> = Addons.sort(() => 0.5 - Math.random()).slice(0, count);
    return addons;
}

export const createPizza = (name: string, addons: Array<CreateAddonDto>): CreatePizzaDto => {
    const types = Object.values(Type);
    const pizzaAddons = addons.sort(() => 0.5 - Math.random()).slice(0, Math.round(Math.random() * (addons.length - 1)));
    const variants = createVariants();
    const ingredients = createIngredients(Math.round(Math.random() * 3 + 2));
    return {
        name: name,
        type: types.at(Math.round(Math.random() * (types.length - 1))),
        addons: pizzaAddons,
        variants: variants,
        ingredients: ingredients
    };
}

export const transformPizzaDto = (createPizzaDto: CreatePizzaDto) => {
    let addonInputs: Prisma.AddonCreateOrConnectWithoutPizzasInput[] = createPizzaDto.addons.map(addon => {
      let addonInput: Prisma.AddonCreateOrConnectWithoutPizzasInput = {
        where: {
          name: addon.name
        },
        create: {...addon}
      } 
      return addonInput;
    });

    let ingredientInputs: Prisma.IngredientCreateManyPizzaInput[] = createPizzaDto.ingredients.map(ing => {
      let ingredientInput: Prisma.IngredientCreateManyPizzaInput = {...ing};
      return ingredientInput;
    });

    let variantInputs: Prisma.VariantCreateManyPizzaInput[] = createPizzaDto.variants.map(variant => {
      let variantInput: Prisma.VariantCreateManyPizzaInput = {...variant};
      return variantInput;
    });

    return {addonInputs, ingredientInputs, variantInputs};
  }

export const createPizzas = (count: number, addons: Array<CreateAddonDto>): Array<CreatePizzaDto> => {
    const pizzas = Pizzas.sort(() => 0.5 - Math.random()).slice(0, count).map((name): CreatePizzaDto => {
        return createPizza(name, addons);
    });
    return pizzas;
} 

export const createAdditives = (): Array<CreateAdditiveDto> => {
    return Additives;
}

//input only after inserting into db
export const createSelectedPizzas = (count: number, pizzas: Array<any>): Array<CreateSelectedPizzaDto> => {
    const selectedPizzas = Array
        .from({length: count})
        .map(() => {
            const pizza = pizzas.at(Math.random() * (pizzas.length - 1));
            const randomVariant = pizza.variants.at(Math.round(Math.random() * (pizza.variants.length - 1)));
            const randomAddonsIds = pizza.addons
                .sort(() => 0.5 - Math.random())
                .slice(0, Math.round(Math.random() * 4))
                .map(addon => addon.id);
            const ingredientsIds = pizza.ingredients
                .map(i => i.id);
            return {
                image: randomVariant.image,
                dough: randomVariant.dough,
                name: pizza.name,
                type: pizza.type,
                price: randomVariant.price,
                size: randomVariant.size,
                weight: randomVariant.weight,
                addons: randomAddonsIds,
                ingredients: ingredientsIds
            }
        });
    return selectedPizzas;
}

//input only after inserting into db
export const createOrders = (count: number, additives: Array<any>, pizzas: Array<any>): Array<CreateOrderDto> => {
    const orders = Array
        .from({length: count})
        .map((): CreateOrderDto => {
            const additivesCount = Math.round(Math.random() * 4);
            const randomAdditivesIds = additives 
                .sort(() => 0.5 - Math.random())
                .slice(0, additivesCount)
                .map(a => a.id);
            const selectedPizzasCount = Math.round(Math.random() * 3 + 1);
            const selectedPizzas = createSelectedPizzas(selectedPizzasCount, pizzas);
            return {
                additives: randomAdditivesIds,
                selectedPizzas: selectedPizzas
            }
        });
    return orders;
}




export const createUsers = (count: number): Array<CreateUserDto> => {
    const admin = randomUser();
    admin.roles = ['ADMIN'];
    admin.username = 'admin';
    admin.password = 'admin';

    const user = randomUser();
    user.username = 'user';
    user.password = 'user';

    const users = Array.from({length: count - 2}).map(randomUser);
    users.push(admin);
    users.push(user);
    return users;
} 