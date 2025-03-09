/*
  Warnings:

  - You are about to drop the column `address_id` on the `packages` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressee_id]` on the table `address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressee_id` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "packages" DROP CONSTRAINT "packages_address_id_fkey";

-- AlterTable
ALTER TABLE "address" ADD COLUMN     "addressee_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "packages" DROP COLUMN "address_id";

-- CreateIndex
CREATE UNIQUE INDEX "address_addressee_id_key" ON "address"("addressee_id");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_addressee_id_fkey" FOREIGN KEY ("addressee_id") REFERENCES "addressees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
