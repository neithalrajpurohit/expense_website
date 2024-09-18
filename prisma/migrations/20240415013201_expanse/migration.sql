-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phoneNumber" TEXT;

-- CreateTable
CREATE TABLE "Expanse" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expanse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Expanse_title_idx" ON "Expanse"("title");
