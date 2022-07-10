import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IngredientEntity } from './entities/ingredient.entity';

@Controller('ingredient')
@ApiTags('Ingredient Controller')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  @ApiCreatedResponse({type: IngredientEntity})
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.create(createIngredientDto);
  }

  @Get()
  @ApiOkResponse({type: [IngredientEntity]})
  findAll() {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: IngredientEntity})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type: IngredientEntity})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientService.update(+id, updateIngredientDto);
  }

  @Delete(':id')
  @ApiOkResponse({type: IngredientEntity})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientService.remove(+id);
  }
}
