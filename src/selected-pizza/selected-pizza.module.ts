import { Module } from '@nestjs/common';
import { SelectedPizzaService } from './selected-pizza.service';

@Module({
  providers: [SelectedPizzaService],
  exports: [SelectedPizzaService]
})
export class SelectedPizzaModule {}
