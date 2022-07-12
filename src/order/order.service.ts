import { Injectable } from '@nestjs/common';
import { Order, Prisma, PrismaPromise, SelectedPizza } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SelectedPizzaService } from 'src/selected-pizza/selected-pizza.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  
  constructor(
    private prisma: PrismaService,
    private selectedPizzeService: SelectedPizzaService
  ) {}

  create(createOrderDto: CreateOrderDto): Promise<Order> {
    const {additives, selectedPizzas, userId} = createOrderDto;

    let selectedPizzaInputs =  selectedPizzas.map(pizza => {
      const {ingredients, addons, ...pizzaInfo} = pizza;
      const input: Prisma.SelectedPizzaCreateWithoutOrderInput = {
          ...pizzaInfo,
          ingredients: {
            connect: ingredients.map(id => {return {id}})
          },
          addons: {
            connect: addons.map(id => {return {id}})
          }
      }
      return input;
    });

    return this.prisma.order.create({
      data: {
        userId,
        additives: {
          connect: additives.map(a => {return {id: a}})
        },
        pizzas: {
          create: selectedPizzaInputs
        }
      }
    })
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
