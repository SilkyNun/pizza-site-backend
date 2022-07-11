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



  @Delete(':id')
  @ApiOkResponse({type: IngredientEntity})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientService.remove(+id);
  }
}
