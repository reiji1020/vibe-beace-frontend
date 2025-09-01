-- Create enums
DO $$ BEGIN
  CREATE TYPE "StatusWithLow" AS ENUM ('unused','used','low');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "StatusBasic" AS ENUM ('unused','used');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Thread.status: TEXT -> StatusWithLow
ALTER TABLE "Thread"
  ALTER COLUMN "status" TYPE "StatusWithLow"
  USING CASE
    WHEN "status" IS NULL THEN NULL
    WHEN "status" IN ('unused','used','low') THEN "status"::"StatusWithLow"
    ELSE 'unused'::"StatusWithLow"
  END;

-- Bead.status: TEXT -> StatusWithLow
ALTER TABLE "Bead"
  ALTER COLUMN "status" TYPE "StatusWithLow"
  USING CASE
    WHEN "status" IS NULL THEN NULL
    WHEN "status" IN ('unused','used','low') THEN "status"::"StatusWithLow"
    ELSE 'unused'::"StatusWithLow"
  END;

-- CutCloth.status: TEXT -> StatusBasic (map 'low' and others to 'used')
ALTER TABLE "CutCloth"
  ALTER COLUMN "status" TYPE "StatusBasic"
  USING CASE
    WHEN "status" IS NULL THEN NULL
    WHEN "status" IN ('unused','used') THEN "status"::"StatusBasic"
    ELSE 'used'::"StatusBasic"
  END;

-- XStitchCloth.status: TEXT -> StatusBasic (map 'low' and others to 'used')
ALTER TABLE "XStitchCloth"
  ALTER COLUMN "status" TYPE "StatusBasic"
  USING CASE
    WHEN "status" IS NULL THEN NULL
    WHEN "status" IN ('unused','used') THEN "status"::"StatusBasic"
    ELSE 'used'::"StatusBasic"
  END;

