-- CreateTable
CREATE TABLE "user_profile" (
    "user_id" UUID NOT NULL,
    "goal" TEXT NOT NULL,
    "experience" VARCHAR(40) NOT NULL,
    "days_per_week" INTEGER NOT NULL,
    "session_length" INTEGER NOT NULL,
    "equipment" VARCHAR(40) NOT NULL,
    "injuries" TEXT,
    "preferred_split" VARCHAR(40) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("user_id")
);
