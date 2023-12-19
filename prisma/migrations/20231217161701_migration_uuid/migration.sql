/*
  Warnings:

  - The primary key for the `Currency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DailyExchangeRate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DailySale` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductCompany` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Purchase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PurchasedItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tenant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "DailyExchangeRate" DROP CONSTRAINT "DailyExchangeRate_currencySourceId_fkey";

-- DropForeignKey
ALTER TABLE "DailySale" DROP CONSTRAINT "DailySale_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCompany" DROP CONSTRAINT "ProductCompany_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_dailySaleId_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedItem" DROP CONSTRAINT "PurchasedItem_currencySnapshotId_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedItem" DROP CONSTRAINT "PurchasedItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedItem" DROP CONSTRAINT "PurchasedItem_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_tenantId_fkey";

-- AlterTable
ALTER TABLE "Currency" DROP CONSTRAINT "Currency_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Currency_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Currency_id_seq";

-- AlterTable
ALTER TABLE "DailyExchangeRate" DROP CONSTRAINT "DailyExchangeRate_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "currencySourceId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DailyExchangeRate_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DailyExchangeRate_id_seq";

-- AlterTable
ALTER TABLE "DailySale" DROP CONSTRAINT "DailySale_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "tenantId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DailySale_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DailySale_id_seq";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "companyId" SET DATA TYPE TEXT,
ALTER COLUMN "currencyId" SET DATA TYPE TEXT,
ALTER COLUMN "tenantId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "ProductCompany" DROP CONSTRAINT "ProductCompany_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "tenantId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductCompany_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductCompany_id_seq";

-- AlterTable
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "dailySaleId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Purchase_id_seq";

-- AlterTable
ALTER TABLE "PurchasedItem" DROP CONSTRAINT "PurchasedItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "purchaseId" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "currencySnapshotId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PurchasedItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PurchasedItem_id_seq";

-- AlterTable
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tenant_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "tenantId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "ProductCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCompany" ADD CONSTRAINT "ProductCompany_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailySale" ADD CONSTRAINT "DailySale_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_dailySaleId_fkey" FOREIGN KEY ("dailySaleId") REFERENCES "DailySale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedItem" ADD CONSTRAINT "PurchasedItem_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedItem" ADD CONSTRAINT "PurchasedItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedItem" ADD CONSTRAINT "PurchasedItem_currencySnapshotId_fkey" FOREIGN KEY ("currencySnapshotId") REFERENCES "DailyExchangeRate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyExchangeRate" ADD CONSTRAINT "DailyExchangeRate_currencySourceId_fkey" FOREIGN KEY ("currencySourceId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
