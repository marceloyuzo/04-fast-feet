/*
  Warnings:

  - You are about to drop the `DeliveryMan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DeliveryMan";

-- CreateTable
CREATE TABLE "deliveryMans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "deliveryMans_pkey" PRIMARY KEY ("id")
);
