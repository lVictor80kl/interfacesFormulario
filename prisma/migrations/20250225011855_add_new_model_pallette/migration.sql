-- CreateTable
CREATE TABLE "Pallette" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "colors" JSONB NOT NULL,
    "typo1" TEXT NOT NULL,
    "typo2" TEXT NOT NULL,
    "typo1File" TEXT,
    "typo2File" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pallette_pkey" PRIMARY KEY ("id")
);
