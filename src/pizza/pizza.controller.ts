import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PizzaEntity } from './entities/pizza.entity';
import { JwtAuthGuard, RolesGuard } from 'src/guards';
import { Public, Roles } from 'src/decorators';
import { Role } from '@prisma/client';

@Controller('pizza')
@ApiTags('Pizza controller')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiCreatedResponse({type: PizzaEntity})
  create(@Body() createPizzaDto: CreatePizzaDto) {
    return this.pizzaService.create(createPizzaDto);
  }

  @Get()
  @Public()
  @ApiOkResponse({type: [PizzaEntity]})
  findAll() {
    return this.pizzaService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({type: PizzaEntity})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pizzaService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOkResponse({type: PizzaEntity})
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePizzaDto: UpdatePizzaDto) {
    return this.pizzaService.update(id, updatePizzaDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOkResponse({type: PizzaEntity})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pizzaService.remove(id);
  }
}
