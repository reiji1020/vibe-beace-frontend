-- CreateTable
CREATE TABLE "Thread" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "colorNumber" TEXT NOT NULL,
    "colorName" TEXT,
    "quantity" INTEGER NOT NULL,
    "status" TEXT,
    "wishlist" BOOLEAN NOT NULL,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bead" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "itemCode" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "colorName" TEXT,
    "quantity" INTEGER NOT NULL,
    "status" TEXT,
    "wishlist" BOOLEAN NOT NULL,

    CONSTRAINT "Bead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CutCloth" (
    "id" SERIAL NOT NULL,
    "fabricType" TEXT NOT NULL,
    "pattern" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" TEXT,
    "wishlist" BOOLEAN NOT NULL,

    CONSTRAINT "CutCloth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "XStitchCloth" (
    "id" SERIAL NOT NULL,
    "count" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" TEXT,
    "wishlist" BOOLEAN NOT NULL,

    CONSTRAINT "XStitchCloth_pkey" PRIMARY KEY ("id")
);
