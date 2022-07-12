import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SelectedPizzaModule } from 'src/selected-pizza/selected-pizza.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [SelectedPizzaModule]
})
export class OrderModule {}
