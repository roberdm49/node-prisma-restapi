/*
  Warnings:

  - Added the required column `latestProductHistoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "latestProductHistoryId" TEXT NOT NULL;
