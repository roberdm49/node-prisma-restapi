/*
  Warnings:

  - A unique constraint covering the columns `[name,isoCode,isoNum]` on the table `Currency` will be added. If there are existing duplicate values, this will fail.
  - Made the column `isoCode` on table `Currency` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isoNum` on table `Currency` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Currency" ALTER COLUMN "isoCode" SET NOT NULL,
ALTER COLUMN "isoNum" SET NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Currency_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Currency_name_isoCode_isoNum_key" ON "Currency"("name", "isoCode", "isoNum");
