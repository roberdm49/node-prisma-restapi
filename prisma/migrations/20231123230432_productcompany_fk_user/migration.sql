/*
  Warnings:

  - Added the required column `userId` to the `ProductCompany` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductCompany" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductCompany" ADD CONSTRAINT "ProductCompany_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
