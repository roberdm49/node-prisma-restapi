-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "barCode" TEXT,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;
