import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order, Prisma, PrismaPromise, SelectedPizza } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { use } from 'passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { SelectedPizzaService } from 'src/selected-pizza/selected-pizza.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderNotFoundException } from './exceptions';

@Injectable()
export class OrderService {
  
  constructor(
    private prisma: PrismaService,
    private selectedPizzeService: SelectedPizzaService
  ) {}

  private orderInclude: Prisma.OrderInclude = {
    pizzas: {
      include: {
        addons: true,
        ingredients: true
      }
    },
    additives: true,
  };

  create(createOrderDto: CreateOrderDto, userId: number): Promise<Order> {
    const {additives, selectedPizzas} = createOrderDto;

    let selectedPizzaInputs =  selectedPizzas.map(pizza => {
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

    return this.prisma.order.create({
      data: {
        userId,
        additives: {
          connect: additives.map(a => {return {id: a}})
        },
        pizzas: {
          create: selectedPizzaInputs
        }
      },
      include: this.orderInclude
    })
  }

  findAllRelated(userId: number): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: {
        userId
      },
      include: this.orderInclude
    });  
  }

  async findOneRelated(id: number, userId: number): Promise<Order> {
    const order: Order = await this.prisma.order.findFirst({
      where: {
        id,
        userId
      },
      include: this.orderInclude
    });
    if (!order) {
      throw new OrderNotFoundException(id, userId);
    }
    return order;
  }

  async remove(id: number, userId: number): Promise<Order> {
    const isOwner: boolean = await this.isOwner(id, userId);
    if (!isOwner) {
      throw new OrderNotFoundException(id, userId);
    }

    try {
      const removedOrder: Order = await this.prisma.order.delete({
        where: {id},
        include: this.orderInclude
      });
      return removedOrder;
    } catch(e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new OrderNotFoundException(id, userId);
        }
      }
    }
    throw new HttpException('Unknown exception in OrderService[remove]', HttpStatus.BAD_REQUEST);
  }

  async isOwner(id: number, userId: number): Promise<boolean> {
    const order: Order = await this.prisma.order.findFirst({
      where: {id, userId}
    });
    return order !== null;
  }
}
