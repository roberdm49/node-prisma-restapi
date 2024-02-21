/*
  Warnings:

  - Changed the type of `currencyId` on the `ProductHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ProductHistory" DROP COLUMN "currencyId",
ADD COLUMN     "currencyId" INTEGER NOT NULL;
