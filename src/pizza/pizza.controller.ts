import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PizzaEntity } from './entities/pizza.entity';

@Controller('pizza')
@ApiTags('Pizza controller')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @Post()
  @ApiCreatedResponse({type: PizzaEntity})
  create(@Body() createPizzaDto: CreatePizzaDto) {
    return this.pizzaService.create(createPizzaDto);
  }

  @Get()
  @ApiOkResponse({type: [PizzaEntity]})
  findAll() {
    return this.pizzaService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: PizzaEntity})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pizzaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type: PizzaEntity})
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePizzaDto: UpdatePizzaDto) {
    return this.pizzaService.update(+id, updatePizzaDto);
  }

  @Delete(':id')
  @ApiOkResponse({type: PizzaEntity})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pizzaService.remove(+id);
  }
}
