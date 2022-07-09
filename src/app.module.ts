import { Module } from '@nestjs/common';
import { PizzaModule } from './pizza/pizza.module';
import { VariantModule } from './variant/variant.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { AddonModule } from './addon/addon.module';
import { SelectedPizzaModule } from './selected-pizza/selected-pizza.module';
import { AdditiveModule } from './additive/additive.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PizzaModule, VariantModule, IngredientModule, AddonModule, SelectedPizzaModule, AdditiveModule, OrderModule, UserModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
