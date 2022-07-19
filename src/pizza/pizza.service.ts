import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Pizza, Prisma, PrismaPromise } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { prototype } from 'events';
import { AddonService } from 'src/addon/addon.service';
import { CreateAddonDto } from 'src/addon/dto/create-addon.dto';
import { UniqueConstraintExeption } from 'src/exceptions';
import { CreateIngredientDto } from 'src/ingredient/dto/create-ingredient.dto';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVariantDto } from 'src/variant/dto/create-variant.dto';
import { VariantService } from 'src/variant/variant.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { QueryParams } from './dto/query-params.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { PizzaNotFoundException } from './exceptions/pizza-not-found.exception';

@Injectable()
export class PizzaService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async create(createPizzaDto: CreatePizzaDto): Promise<Pizza> {

    const {addonInputs, ingredientInputs, variantInputs} = this.transformDto(createPizzaDto);

    let createdPizza: Pizza;
    try {
      createdPizza = await this.prisma.pizza.create({
        data: {
          type: createPizzaDto.type,
          name: createPizzaDto.name,
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
    } catch(e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new UniqueConstraintExeption();
        }
      }
    }

    return createdPizza;
  }

  findAll(params: QueryParams): Promise<Pizza[]> {
    let skip: number;
    let take: number;
    let search: string = params.search? params.search : '';
    if (params._limit && params._page) {
      skip = Number(params._limit) * Number(params._page) - Number(params._limit);
      take = Number(params._limit);
    }
    return this.prisma.pizza.findMany({
      skip,
      take,
      include: {
        variants: true,
        ingredients: true,
        addons: true
      },
      where: {
        OR: [
          {
            name: {
              contains: search
            }
          },
          {
            type: {
              contains: search
            }
          }
        ]
      },
      orderBy: {
        name: 'asc',
      }
    });
  }

  async findOne(id: number): Promise<Pizza> {
    const pizza: Pizza = await this.prisma.pizza.findUnique({
      where: {id},
      include: {
        variants: true,
        addons: true,
        ingredients: true
      }
    });

    if (pizza) {
      return pizza;
    }

    throw new PizzaNotFoundException(id);
  }

  async update(id: number, updatePizzaDto: UpdatePizzaDto): Promise<Pizza>  {
    const removePizza: PrismaPromise<Pizza> =  this.prisma.pizza.delete({
      where: {id}
    });

    const {addonInputs, ingredientInputs, variantInputs} = this.transformDto(updatePizzaDto);

    const createPizza: PrismaPromise<Pizza> = this.prisma.pizza.create({
      data: {
        id,
        type: updatePizzaDto.type,
        name: updatePizzaDto.name,
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

    

    try {
      let result: Array<Pizza> = await this.prisma.$transaction([removePizza, createPizza]); 
      return result[1];
    } catch(e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new PizzaNotFoundException(id);
        }
      }
    }

    throw new HttpException(`Unknown exception into PizzaService[update]`, HttpStatus.BAD_REQUEST);
  }

  async remove(id: number): Promise<Pizza> {
    let removedPizza: Pizza;

    try {
      removedPizza = await this.prisma.pizza.delete({
        where: {id},
        include: {
          variants: true,
          ingredients: true
        }
      })
    } catch(e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new PizzaNotFoundException(id);
        }
      }
    }

    return removedPizza;
  }

  private transformDto(createPizzaDto: CreatePizzaDto | UpdatePizzaDto) {
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
}
