-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Additive" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" MONEY NOT NULL,

    CONSTRAINT "Additive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectedPizza" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "dough" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" MONEY NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "SelectedPizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pizza" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "dough" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" MONEY NOT NULL,
    "pizzaId" INTEGER NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addon" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" MONEY NOT NULL,

    CONSTRAINT "Addon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdditiveToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_IngredientToPizza" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_IngredientToSelectedPizza" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AddonToPizza" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AddonToSelectedPizza" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Pizza_name_key" ON "Pizza"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AdditiveToOrder_AB_unique" ON "_AdditiveToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_AdditiveToOrder_B_index" ON "_AdditiveToOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToPizza_AB_unique" ON "_IngredientToPizza"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToPizza_B_index" ON "_IngredientToPizza"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToSelectedPizza_AB_unique" ON "_IngredientToSelectedPizza"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToSelectedPizza_B_index" ON "_IngredientToSelectedPizza"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AddonToPizza_AB_unique" ON "_AddonToPizza"("A", "B");

-- CreateIndex
CREATE INDEX "_AddonToPizza_B_index" ON "_AddonToPizza"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AddonToSelectedPizza_AB_unique" ON "_AddonToSelectedPizza"("A", "B");

-- CreateIndex
CREATE INDEX "_AddonToSelectedPizza_B_index" ON "_AddonToSelectedPizza"("B");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectedPizza" ADD CONSTRAINT "SelectedPizza_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdditiveToOrder" ADD CONSTRAINT "_AdditiveToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Additive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdditiveToOrder" ADD CONSTRAINT "_AdditiveToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToPizza" ADD CONSTRAINT "_IngredientToPizza_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToPizza" ADD CONSTRAINT "_IngredientToPizza_B_fkey" FOREIGN KEY ("B") REFERENCES "Pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToSelectedPizza" ADD CONSTRAINT "_IngredientToSelectedPizza_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToSelectedPizza" ADD CONSTRAINT "_IngredientToSelectedPizza_B_fkey" FOREIGN KEY ("B") REFERENCES "SelectedPizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddonToPizza" ADD CONSTRAINT "_AddonToPizza_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddonToPizza" ADD CONSTRAINT "_AddonToPizza_B_fkey" FOREIGN KEY ("B") REFERENCES "Pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddonToSelectedPizza" ADD CONSTRAINT "_AddonToSelectedPizza_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddonToSelectedPizza" ADD CONSTRAINT "_AddonToSelectedPizza_B_fkey" FOREIGN KEY ("B") REFERENCES "SelectedPizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;
