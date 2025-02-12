/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `deliveryMans` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `deliveryMans` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "deliveryMans_email_key" ON "deliveryMans"("email");

-- CreateIndex
CREATE UNIQUE INDEX "deliveryMans_cpf_key" ON "deliveryMans"("cpf");
