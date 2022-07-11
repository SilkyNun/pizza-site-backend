-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_pizzaId_fkey";

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;
