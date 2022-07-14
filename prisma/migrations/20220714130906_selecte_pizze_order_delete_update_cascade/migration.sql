-- DropForeignKey
ALTER TABLE "SelectedPizza" DROP CONSTRAINT "SelectedPizza_orderId_fkey";

-- AddForeignKey
ALTER TABLE "SelectedPizza" ADD CONSTRAINT "SelectedPizza_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
