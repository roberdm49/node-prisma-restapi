/*
  Warnings:

  - You are about to drop the column `latestExchangeRateId` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `latestProductHistoryId` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Currency" DROP COLUMN "latestExchangeRateId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "latestProductHistoryId";
