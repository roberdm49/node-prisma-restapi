/*
  Warnings:

  - You are about to drop the column `productId` on the `PurchasedItem` table. All the data in the column will be lost.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productHistoryId` to the `PurchasedItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PurchasedItem" DROP CONSTRAINT "PurchasedItem_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PurchasedItem" DROP COLUMN "productId",
ADD COLUMN     "productHistoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProductHistory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER,
    "barCode" TEXT,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,
    "modificationTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductHistory" ADD CONSTRAINT "ProductHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedItem" ADD CONSTRAINT "PurchasedItem_productHistoryId_fkey" FOREIGN KEY ("productHistoryId") REFERENCES "ProductHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
