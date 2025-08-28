-- CreateTable
CREATE TABLE "public"."Student" (
    "stdId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("stdId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "public"."Student"("email");
