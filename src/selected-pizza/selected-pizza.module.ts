import { Module } from '@nestjs/common';
import { SelectedPizzaService } from './selected-pizza.service';

@Module({
  providers: [SelectedPizzaService]
})
export class SelectedPizzaModule {}
