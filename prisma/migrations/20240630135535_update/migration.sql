/*
  Warnings:

  - The primary key for the `persons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `persons` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "persons" DROP CONSTRAINT "persons_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "cin" DROP NOT NULL,
ADD CONSTRAINT "persons_pkey" PRIMARY KEY ("id");
