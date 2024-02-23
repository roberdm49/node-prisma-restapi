/*
  Warnings:

  - You are about to drop the column `currencySnapshotId` on the `PurchasedItem` table. All the data in the column will be lost.
  - Added the required column `dailyExchangeRateId` to the `PurchasedItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PurchasedItem" DROP CONSTRAINT "PurchasedItem_currencySnapshotId_fkey";

-- AlterTable
ALTER TABLE "PurchasedItem" DROP COLUMN "currencySnapshotId",
ADD COLUMN     "dailyExchangeRateId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PurchasedItem" ADD CONSTRAINT "PurchasedItem_dailyExchangeRateId_fkey" FOREIGN KEY ("dailyExchangeRateId") REFERENCES "DailyExchangeRate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
