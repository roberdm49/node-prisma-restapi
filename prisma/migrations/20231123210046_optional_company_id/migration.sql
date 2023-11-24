-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_companyId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "ProductCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;
