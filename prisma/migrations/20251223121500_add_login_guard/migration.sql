-- CreateTable
CREATE TABLE "LoginGuard" (
  "id" SERIAL PRIMARY KEY,
  "key" TEXT NOT NULL,
  "failCount" INTEGER NOT NULL DEFAULT 0,
  "firstFailedAt" TIMESTAMP(3),
  "lockedUntil" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex (unique)
CREATE UNIQUE INDEX "LoginGuard_key_key" ON "LoginGuard"("key");

