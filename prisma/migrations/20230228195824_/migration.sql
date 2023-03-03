/*
  Warnings:

  - You are about to drop the `aimessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "aimessage" DROP CONSTRAINT "aimessage_userId_fkey";

-- DropTable
DROP TABLE "aimessage";

-- CreateTable
CREATE TABLE "chatline" (
    "id" TEXT NOT NULL,
    "who" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "chatline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aichat" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "aichat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chatline" ADD CONSTRAINT "chatline_userId_fkey" FOREIGN KEY ("userId") REFERENCES "aichat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aichat" ADD CONSTRAINT "aichat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
