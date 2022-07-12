import { Injectable } from '@nestjs/common';
import { Prisma, PrismaPromise, SelectedPizza } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSelectedPizzaDto } from './dto/create-selected-pizza.dto';

@Injectable()
export class SelectedPizzaService {

    constructor(
        private prisma: PrismaService
    ) {}
}
