/*
  Warnings:

  - The primary key for the `Currency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Currency` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `currencySourceId` on the `DailyExchangeRate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `currencyId` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "DailyExchangeRate" DROP CONSTRAINT "DailyExchangeRate_currencySourceId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_currencyId_fkey";

-- AlterTable
ALTER TABLE "Currency" DROP CONSTRAINT "Currency_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Currency_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DailyExchangeRate" DROP COLUMN "currencySourceId",
ADD COLUMN     "currencySourceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "currencyId",
ADD COLUMN     "currencyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyExchangeRate" ADD CONSTRAINT "DailyExchangeRate_currencySourceId_fkey" FOREIGN KEY ("currencySourceId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
