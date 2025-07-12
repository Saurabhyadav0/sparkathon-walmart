import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { parse } from "csv-parse";

const prisma = new PrismaClient();

async function main() {
  const csvData = fs.readFileSync("output.csv", "utf8");

  parse(csvData, {
    columns: true,
    skip_empty_lines: true,
  }, async (err: Error | undefined, records: Array<{
    ItemName: string;
    StoreID: string;
    DaysUntilExpiry: string;
    Recommendation?: string;
    ActionQty?: string;
    ActionPct?: string;
    TransferQty?: string;
  }> | undefined) => {
    if (err || !records) {
      console.error(err);
      return;
    }

    for (const rec of records) {
      await prisma.product.create({
        data: {
          itemName: rec.ItemName,
          storeId: parseInt(rec.StoreID),
          daysUntilExpiry: parseInt(rec.DaysUntilExpiry),
          recommendation: rec.Recommendation ? rec.Recommendation.toUpperCase() : "",
          actionQty: rec.ActionQty ? parseInt(rec.ActionQty) : null,
          actionPct: rec.ActionPct ? parseFloat(rec.ActionPct) : null,
          transferQty: rec.TransferQty ? parseInt(rec.TransferQty) : null,
        },
      });
    }

    console.log("Database seeded successfully 🚀");
    process.exit(0);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
