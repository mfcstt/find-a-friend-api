/*
  Warnings:

  - You are about to drop the column `independency_level` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `requires` on the `pets` table. All the data in the column will be lost.
  - Added the required column `independence_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirements` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IndependenceLevel" AS ENUM ('BAIXO', 'MEDIO', 'ALTO');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "independency_level",
DROP COLUMN "requires",
ADD COLUMN     "independence_level" "IndependenceLevel" NOT NULL,
ADD COLUMN     "requirements" TEXT NOT NULL;

-- DropEnum
DROP TYPE "IndependencyLevel";
