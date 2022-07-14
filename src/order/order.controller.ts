import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { User } from 'src/decorators';
import { JwtAuthGuard } from 'src/guards';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';
import { ParameterObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

@Controller('order')
@ApiTags('Order controller')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiCreatedResponse({type: OrderEntity})
  create(@Body() createOrderDto: CreateOrderDto, @User() user) {
    return this.orderService.create(createOrderDto, user.id);
  }

  @Get()
  @ApiOkResponse({type: [OrderEntity]})
  findAllRelated(@User() user) {
    return this.orderService.findAllRelated(user.id);
  }

  @Get(':id')
  @ApiOkResponse({type: OrderEntity})
  findOne(@Param('id', ParseIntPipe) id: number, @User() user) {
    return this.orderService.findOneRelated(id, user.id);
  }

  @Delete(':id')
  @ApiOkResponse({type: OrderEntity})
  remove(@Param('id', ParseIntPipe) id: number, @User() user) {
    return this.orderService.remove(id, user.id);
  }
}
