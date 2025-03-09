/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `addressees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "addressees_name_key" ON "addressees"("name");
