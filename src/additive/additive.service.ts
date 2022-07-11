import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Additive } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdditiveDto } from './dto/create-additive.dto';
import { UpdateAdditiveDto } from './dto/update-additive.dto';
import { AdditiveNotFoundException } from './exceptions/additive-not-fount.exception';

@Injectable()
export class AdditiveService {

  constructor(
    private prisma: PrismaService
  ) {}

  create(createAdditiveDto: CreateAdditiveDto): Promise<Additive> {
    return this.prisma.additive.create({
      data: {...createAdditiveDto}
    });
  }

  findAll(): Promise<Additive[]> {
    return this.prisma.additive.findMany();
  }

  async findOne(id: number): Promise<Additive> {
    const additive: Additive = await this.prisma.additive.findUnique({
      where: {id}
    });

    if (additive) {
      return additive;
    }

    throw new AdditiveNotFoundException(id);
  }

  async update(id: number, updateAdditiveDto: UpdateAdditiveDto): Promise<Additive> {
    try {
      const updatedAdditive: Additive = await this.prisma.additive.update({
        where: {id},
        data: {...updateAdditiveDto}
      });

      return updatedAdditive;
    } catch(e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new AdditiveNotFoundException(id);
        }
      }
    }

    throw new HttpException('Unknown exception into AdditiveService[update]', HttpStatus.BAD_REQUEST);
  }

  async remove(id: number): Promise<Additive> {
    try {
      return await this.prisma.additive.delete({
        where: {id}
      });
    } catch(e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new AdditiveNotFoundException(id);
        }
      }
    }

    throw new HttpException('Unknown exception into AdditiveService[remove]', HttpStatus.BAD_REQUEST);
  }
}
