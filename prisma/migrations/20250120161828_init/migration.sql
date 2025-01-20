-- CreateTable
CREATE TABLE "DataTable" (
    "id" SERIAL NOT NULL,
    "DataName" TEXT NOT NULL,
    "DataValue" TEXT NOT NULL,
    "DataRequired" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DataTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DataTable_DataName_key" ON "DataTable"("DataName");
