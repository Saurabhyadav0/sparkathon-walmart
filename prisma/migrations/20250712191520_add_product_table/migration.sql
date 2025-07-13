-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "ItemName" TEXT NOT NULL,
    "Brand" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "StockQty" INTEGER NOT NULL,
    "ArrivalDate" TIMESTAMP(3) NOT NULL,
    "ExpiryDate" TIMESTAMP(3) NOT NULL,
    "DaysUntilExpiry" DOUBLE PRECISION NOT NULL,
    "DailySaleAvg" DOUBLE PRECISION NOT NULL,
    "SpoilageChance" DOUBLE PRECISION NOT NULL,
    "SuggestedAction" TEXT NOT NULL,
    "StoreLocation" TEXT NOT NULL,
    "IsSpoiled" BOOLEAN NOT NULL,
    "OnPromotion" TEXT NOT NULL,
    "TemperatureSensitive" BOOLEAN NOT NULL,
    "StoreID" TEXT NOT NULL,
    "Zone" TEXT,
    "TemperatureSupport" TEXT,
    "DistanceToNearestStore" DOUBLE PRECISION NOT NULL,
    "AvgDailySaleInNearbyStores" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
