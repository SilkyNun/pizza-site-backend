import { Injectable } from '@nestjs/common';
import { Prisma, PrismaPromise, Variant } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class VariantService {

  constructor(
    private prisma: PrismaService
  ) {}

  create(createVariantDto: CreateVariantDto, pizzaId: number): Promise<Variant> {
    return this.prisma.variant.create({
      data: {pizzaId, ...createVariantDto}
    })
  }

  createMany(createVariantDtos: CreateVariantDto[], pizzaId: number): PrismaPromise<Prisma.BatchPayload> {
    let variants: Prisma.VariantCreateManyInput[] = [];

    createVariantDtos.forEach(dto => {
      let variantInput: Prisma.VariantCreateManyInput = {
        ...dto,
        pizzaId
      };
      variants.push(variantInput);
    })

    return this.prisma.variant.createMany({      
      data: variants
    });

  }

  findAllRelated(pizzaId: number): Promise<Variant[]> {
    return this.prisma.variant.findMany({
      where: {pizzaId}
    })
  }

  update(id: number, updateVariantDto: UpdateVariantDto): Promise<Variant> {
    return this.prisma.variant.update({
      where: {id},
      data: {...updateVariantDto}
    })
  }

  remove(id: number): Promise<Variant> {
    return this.prisma.variant.delete({
      where: {id}
    })
  }

  async removeAllRelated(pizzaId: number): Promise<number> {
    const {count} = await this.prisma.variant.deleteMany({
      where: {pizzaId}
    });

    return count;
  }
}
