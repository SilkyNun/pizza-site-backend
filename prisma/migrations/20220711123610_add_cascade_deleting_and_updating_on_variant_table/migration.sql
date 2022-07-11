-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_pizzaId_fkey";

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;
