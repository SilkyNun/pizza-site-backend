import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { Public, Roles, User } from 'src/decorators';
import { Role } from '@prisma/client';
import { JwtAuthGuard, RolesGuard } from 'src/guards';

@Controller('user')
@ApiTags('User controller')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiCreatedResponse({type: UserEntity})
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('all')
  @Roles(Role.ADMIN)
  @ApiOkResponse({type: [UserEntity]})
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOkResponse({type: UserEntity})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  @Roles(Role.USER)
  @ApiOkResponse({type: UserEntity})
  findOneRelated(@User() user) {
    return this.userService.findOne(user.id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOkResponse({type: UserEntity})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch()
  @Roles(Role.USER)
  @ApiOkResponse({type: UserEntity})
  updateRelated(@User() user, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOkResponse({type: UserEntity})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Delete()
  @Roles(Role.USER)
  @ApiOkResponse({type: UserEntity})
  removeRelated(@User() user) {
    return this.userService.remove(user.id);
  }
}
