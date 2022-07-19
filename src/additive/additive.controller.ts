import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Public, Roles } from 'src/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/guards';
import { AdditiveService } from './additive.service';
import { CreateAdditiveDto } from './dto/create-additive.dto';
import { UpdateAdditiveDto } from './dto/update-additive.dto';
import { AdditiveEntity } from './entities/additive.entity';

@Controller('additive')
@ApiTags('Additive controller')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdditiveController {
  constructor(private readonly additiveService: AdditiveService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiCreatedResponse({type: AdditiveEntity})
  create(@Body() createAdditiveDto: CreateAdditiveDto) {
    return this.additiveService.create(createAdditiveDto);
  }

  @Get()
  @Public()
  @ApiOkResponse({type: [AdditiveEntity]})
  findAll() {
    return this.additiveService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({type: AdditiveEntity})
  findOne(@Param('id') id: string) {
    return this.additiveService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOkResponse({type: AdditiveEntity})
  update(@Param('id') id: string, @Body() updateAdditiveDto: UpdateAdditiveDto) {
    return this.additiveService.update(+id, updateAdditiveDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOkResponse({type: AdditiveEntity})
  remove(@Param('id') id: string) {
    return this.additiveService.remove(+id);
  }
}
