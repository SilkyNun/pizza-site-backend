/*
  Warnings:

  - You are about to drop the `_IngredientToPizza` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pizzaId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_IngredientToPizza" DROP CONSTRAINT "_IngredientToPizza_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToPizza" DROP CONSTRAINT "_IngredientToPizza_B_fkey";

-- DropIndex
DROP INDEX "Ingredient_name_key";

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "pizzaId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_IngredientToPizza";

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
