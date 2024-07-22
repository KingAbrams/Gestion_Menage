-- CreateTable
CREATE TABLE "persons" (
    "id" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "cin" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "link_with_chief" TEXT NOT NULL,
    "job" TEXT,
    "other_source" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "persons_cin_key" ON "persons"("cin");
