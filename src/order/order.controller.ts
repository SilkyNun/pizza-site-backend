import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { Roles, User } from 'src/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/guards';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';
import { ParameterObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Role } from '@prisma/client';

@Controller('order')
@ApiTags('Order controller')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(Role.USER)
  @ApiCreatedResponse({type: OrderEntity})
  create(@Body() createOrderDto: CreateOrderDto, @User() user) {
    return this.orderService.create(createOrderDto, user.id);
  }

  @Get()
  @Roles(Role.USER)
  @ApiOkResponse({type: [OrderEntity]})
  findAllRelated(@User() user) {
    return this.orderService.findAllRelated(user.id);
  }

  @Get(':id')
  @Roles(Role.USER)
  @ApiOkResponse({type: OrderEntity})
  findOne(@Param('id', ParseIntPipe) id: number, @User() user) {
    return this.orderService.findOneRelated(id, user.id);
  }

  @Delete(':id')
  @Roles(Role.USER)
  @ApiOkResponse({type: OrderEntity})
  remove(@Param('id', ParseIntPipe) id: number, @User() user) {
    return this.orderService.remove(id, user.id);
  }
}
