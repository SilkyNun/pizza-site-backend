import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { hash } from 'bcrypt';
import { Roles } from 'src/decorators';
import { UniqueConstraintExeption } from 'src/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundException } from './exception';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService,
  ) {}

  private selectedOption: Prisma.UserSelect = {
    id: true,
    createdAt: true,
    updatedAt: true,
    firstName: true,
    lastName: true,
    email: true,
    tel: true,
    address: true,
    username: true,
    password: true,
    roles: true
  };

  async create(createUserDto: CreateUserDto): Promise<Prisma.UserSelect> {
    try {
      const passwordHash = await hash(createUserDto.password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: passwordHash,
        },
        select: this.selectedOption
      });

      return user;
    } catch(e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          console.log(e);
          throw new UniqueConstraintExeption();
        }
      }
    }

    throw new HttpException('Unknown exception in UserService[create]', HttpStatus.BAD_REQUEST);
  }

  findAll(): Promise<Prisma.UserSelect[]> {
    return this.prisma.user.findMany({
      select: this.selectedOption
    });
  }

  async findOne(id: number): Promise<Prisma.UserSelect> {
    const user = await this.prisma.user.findUnique({
      where: {id},
      select: this.selectedOption
    });
    
    if (user) {
      return user;
    }

    throw new UserNotFoundException(id);
  }

  findOneByUsername(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {username}
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Prisma.UserSelect> {
    try {
      if (updateUserDto.password) {
        updateUserDto.password = await hash(updateUserDto.password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
      }
      const user = await this.prisma.user.update({
        where: {id},
        data: {...updateUserDto},
        select: this.selectedOption
      });
      return user;
    } catch(e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new UserNotFoundException(id);
        }
        if (e.code === 'P2002') {
          throw new UniqueConstraintExeption();
        }
      }
    }

    throw new HttpException(`Unknown exception in UserService[update]`, HttpStatus.BAD_REQUEST);
  }

  async remove(id: number): Promise<Prisma.UserSelect> {
    try {
      const user = await this.prisma.user.delete({
        where: {id},
        select: this.selectedOption
      });
      return user;
    } catch(e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new UserNotFoundException(id);
        }
      }
    }

    throw new HttpException('Unknown exception in UserService[remove]', HttpStatus.BAD_REQUEST);
  }
}
