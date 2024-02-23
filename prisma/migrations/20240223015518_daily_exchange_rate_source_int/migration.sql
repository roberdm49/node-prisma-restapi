/*
  Warnings:

  - You are about to drop the column `currencySourceId` on the `DailyExchangeRate` table. All the data in the column will be lost.
  - Added the required column `currencyId` to the `DailyExchangeRate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DailyExchangeRate" DROP CONSTRAINT "DailyExchangeRate_currencySourceId_fkey";

-- AlterTable
ALTER TABLE "DailyExchangeRate" DROP COLUMN "currencySourceId",
ADD COLUMN     "currencyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DailyExchangeRate" ADD CONSTRAINT "DailyExchangeRate_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
