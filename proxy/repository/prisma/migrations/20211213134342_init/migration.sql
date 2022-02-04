-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" JSONB,
    "residue" JSONB,
    "info" JSONB,
    "barcode" JSONB,
    "img" JSONB,
    "specs" JSONB,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);
