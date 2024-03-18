/*
  Warnings:

  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `name` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `tenantId` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - The primary key for the `Currency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Currency` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `name` on the `Currency` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `isoCode` on the `Currency` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `isoNum` on the `Currency` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - The primary key for the `DailyExchangeRate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `DailyExchangeRate` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `currencyId` on the `DailyExchangeRate` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - The primary key for the `DailySale` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `DailySale` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `tenantId` on the `DailySale` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `name` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `description` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `barCode` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `tenantId` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `companyId` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `currencyId` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - The primary key for the `ProductHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ProductHistory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `name` on the `ProductHistory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `description` on the `ProductHistory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `barCode` on the `ProductHistory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `tenantId` on the `ProductHistory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `companyId` on the `ProductHistory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `currencyId` on the `ProductHistory` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `productId` on the `ProductHistory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - The primary key for the `Purchase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Purchase` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `dailySaleId` on the `Purchase` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - The primary key for the `PurchasedItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `PurchasedItem` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `purchaseId` on the `PurchasedItem` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `productHistoryId` on the `PurchasedItem` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `dailyExchangeRateId` on the `PurchasedItem` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - The primary key for the `Tenant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Tenant` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `name` on the `Tenant` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `firstname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `lastname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `tenantId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "DailyExchangeRate" DROP CONSTRAINT "DailyExchangeRate_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "DailySale" DROP CONSTRAINT "DailySale_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "ProductHistory" DROP CONSTRAINT "ProductHistory_productId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_dailySaleId_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedItem" DROP CONSTRAINT "PurchasedItem_dailyExchangeRateId_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedItem" DROP CONSTRAINT "PurchasedItem_productHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedItem" DROP CONSTRAINT "PurchasedItem_purchaseId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_tenantId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "tenantId" SET DATA TYPE VARCHAR(60),
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Currency" DROP CONSTRAINT "Currency_pkey",
ALTER COLUMN "id" SET DATA TYPE SMALLINT,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "isoCode" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "isoNum" SET DATA TYPE VARCHAR(60),
ADD CONSTRAINT "Currency_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DailyExchangeRate" DROP CONSTRAINT "DailyExchangeRate_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "currencyId" SET DATA TYPE SMALLINT,
ADD CONSTRAINT "DailyExchangeRate_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DailySale" DROP CONSTRAINT "DailySale_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "tenantId" SET DATA TYPE VARCHAR(60),
ADD CONSTRAINT "DailySale_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "barCode" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "tenantId" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "companyId" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "currencyId" SET DATA TYPE SMALLINT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProductHistory" DROP CONSTRAINT "ProductHistory_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "barCode" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "tenantId" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "companyId" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "currencyId" SET DATA TYPE SMALLINT,
ALTER COLUMN "productId" SET DATA TYPE VARCHAR(60),
ADD CONSTRAINT "ProductHistory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "dailySaleId" SET DATA TYPE VARCHAR(60),
ADD CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PurchasedItem" DROP CONSTRAINT "PurchasedItem_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "purchaseId" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "productHistoryId" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "dailyExchangeRateId" SET DATA TYPE VARCHAR(60),
ADD CONSTRAINT "PurchasedItem_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(120),
ADD CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "firstname" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "lastname" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "tenantId" SET DATA TYPE VARCHAR(60),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductHistory" ADD CONSTRAINT "ProductHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailySale" ADD CONSTRAINT "DailySale_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_dailySaleId_fkey" FOREIGN KEY ("dailySaleId") REFERENCES "DailySale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedItem" ADD CONSTRAINT "PurchasedItem_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedItem" ADD CONSTRAINT "PurchasedItem_productHistoryId_fkey" FOREIGN KEY ("productHistoryId") REFERENCES "ProductHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedItem" ADD CONSTRAINT "PurchasedItem_dailyExchangeRateId_fkey" FOREIGN KEY ("dailyExchangeRateId") REFERENCES "DailyExchangeRate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyExchangeRate" ADD CONSTRAINT "DailyExchangeRate_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
