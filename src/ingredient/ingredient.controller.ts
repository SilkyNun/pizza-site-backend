import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IngredientEntity } from './entities/ingredient.entity';
import { Public, Roles } from 'src/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/guards';
import { Role } from '@prisma/client';

@Controller('ingredient')
@ApiTags('Ingredient Controller')
@UseGuards(JwtAuthGuard, RolesGuard)
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  @Public() 
  @ApiOkResponse({type: [IngredientEntity]})
  findAll() {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({type: IngredientEntity})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientService.findOne(id);
  }



  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOkResponse({type: IngredientEntity})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientService.remove(id);
  }
}
