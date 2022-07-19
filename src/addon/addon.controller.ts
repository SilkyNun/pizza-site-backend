import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Public, Roles } from 'src/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/guards';
import { AddonService } from './addon.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { AddonEntity } from './entities/addon.entity';

@Controller('addon')
@ApiTags('Addon controller')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AddonController {
  constructor(private readonly addonService: AddonService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiCreatedResponse({type: AddonEntity})
  create(@Body() createAddonDto: CreateAddonDto) {
    return this.addonService.create(createAddonDto);
  }

  @Get()
  @Public()
  @ApiOkResponse({type: [AddonEntity]})
  findAll() {
    return this.addonService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({type: AddonEntity})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.addonService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOkResponse({type: AddonEntity})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAddonDto: UpdateAddonDto) {
    return this.addonService.update(+id, updateAddonDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOkResponse({type: AddonEntity})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.addonService.remove(+id);
  }
}
