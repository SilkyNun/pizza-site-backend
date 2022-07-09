import { HttpException, Injectable } from '@nestjs/common';
import { Ingredient, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { IngredientNotFoundException } from './exceptions/ingredient-not-found.exception';

@Injectable()
export class IngredientService {

  constructor(
    private prisma: PrismaService
  ) {}

  create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    return this.prisma.ingredient.create({
      data: {
        ...createIngredientDto
      }
    });
  }

  findAll(): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany();
  }

  async findOne(id: number): Promise<Ingredient> {
    const ingredient: Ingredient = await this.prisma.ingredient.findUnique({
      where: {id}
    });

    if (ingredient) {
      return ingredient
    }

    throw new IngredientNotFoundException(id);
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto): Promise<Ingredient> {
    let ingredient: Ingredient;

    try {
      ingredient = await this.prisma.ingredient.update({
        where: {id},
        data: {...updateIngredientDto}
      });
    } catch(e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new IngredientNotFoundException(id);
        }
      }
    }

    return ingredient;
  }

  async remove(id: number): Promise<Ingredient> {
    let ingredient: Ingredient;

    try {

      ingredient = await this.prisma.ingredient.delete({
        where: {id}
      })
    } catch(e) {

      if (e instanceof PrismaClientKnownRequestError) {
        
        if (e.code === 'P2025') {
          throw new IngredientNotFoundException(id);
        }
      }
    }

    return ingredient;
  }
}
