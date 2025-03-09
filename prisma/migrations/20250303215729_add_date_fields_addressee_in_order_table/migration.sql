/*
  Warnings:

  - Added the required column `addressee` to the `packages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "packages" ADD COLUMN     "addressee" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "delivered_at" TIMESTAMP(3),
ADD COLUMN     "picked_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3);
