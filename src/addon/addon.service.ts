import { Injectable } from '@nestjs/common';
import { Addon, Prisma, PrismaClient, PrismaPromise } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { AddonNotFoundException } from './exceptions/addon-not-found.exception';

@Injectable()
export class AddonService {

  constructor(
    private prisma: PrismaService
  ) {}

  create(createAddonDto: CreateAddonDto): Promise<Addon> {
    return this.prisma.addon.create({
      data: {...createAddonDto}
    });
  }

  createOrConnect(createAddonDtos: CreateAddonDto[], pizzaId: number): Promise<Addon[]> {
    let addons: Prisma.AddonUpsertArgs[] = [];

    createAddonDtos.forEach(dto => {
      let addon: Prisma.AddonUpsertArgs = {
        where: {
          name: dto.name
        },
        create: {
          pizzas: {
            connect: {
              id: pizzaId
            }
          },
          ...dto
        },
        update: {
          pizzas: {
            connect: {
              id: pizzaId
            }
          }
        }
      }
      addons.push(addon);
    })

    let upsertStack = addons.map(addon => this.prisma.addon.upsert(addon));
    return this.prisma.$transaction(upsertStack);
  }

  findAll(): Promise<Addon[]> {
    return this.prisma.addon.findMany();
  }

  async findOne(id: number): Promise<Addon> {
    const addon: Addon = await this.prisma.addon.findUnique({
      where: {id}
    });

    if (addon) {
      return addon;
    }

    throw new AddonNotFoundException(id);
  }

  async update(id: number, updateAddonDto: UpdateAddonDto): Promise<Addon> {
    let addon: Addon;

    try {
      addon = await this.prisma.addon.update({
        where: {id},
        data: {...updateAddonDto}
      });
    } catch(e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new AddonNotFoundException(id);
        }
      }
    }

    return addon;
  }

  async remove(id: number): Promise<Addon> {
    let addon: Addon;

    try {
      addon = await this.prisma.addon.delete({
        where: {id}
      });
    } catch(e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new AddonNotFoundException(id);
        }
      }
    }

    return addon;
  }
}
