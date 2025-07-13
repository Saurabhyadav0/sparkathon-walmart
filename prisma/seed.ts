import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import { parse } from 'csv-parse'
import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient()

type ProductCsvRecord = {
  ItemName: string;
  Brand: string;
  Category: string;
  StockQty: string;
  ArrivalDate: string;
  ExpiryDate: string;
  DaysUntilExpiry: string;
  DailySaleAvg: string;
  SpoilageChance: string;
  SuggestedAction: string;
  StoreLocation: string;
  IsSpoiled: string;
  OnPromotion: string;
  TemperatureSensitive: string;
  StoreID: string;
  Zone?: string;
  TemperatureSupport?: string;
  DistanceToNearestStore: string;
  AvgDailySaleInNearbyStores: string;
};

async function main() {
  const csvData = fs.readFileSync('./backend/data.csv', 'utf8')

  parse(csvData, {
    columns: true,
    skip_empty_lines: true,
  }, async (err, records: ProductCsvRecord[]) => {
    if (err) {
      console.error('CSV parse error:', err)
      return
    }

    for (const rec of records) {
      try {
        await prisma.product.create({
          data: {
            ItemName: rec.ItemName,
            Brand: rec.Brand,
            Category: rec.Category,
            StockQty: parseInt(rec.StockQty),
            ArrivalDate: new Date(rec.ArrivalDate.split('-').reverse().join('-')),
            ExpiryDate: new Date(rec.ExpiryDate.split('-').reverse().join('-')),
            DaysUntilExpiry: parseFloat(rec.DaysUntilExpiry),
            DailySaleAvg: parseFloat(rec.DailySaleAvg),
            SpoilageChance: parseFloat(rec.SpoilageChance),
            SuggestedAction: rec.SuggestedAction,
            StoreLocation: rec.StoreLocation,
            IsSpoiled: rec.IsSpoiled.toLowerCase() === 'true',
            OnPromotion: rec.OnPromotion,
            TemperatureSensitive: rec.TemperatureSensitive.toLowerCase() === 'true',
            StoreID: rec.StoreID,
            Zone: rec.Zone || null,
            TemperatureSupport: rec.TemperatureSupport || null,
            DistanceToNearestStore: parseFloat(rec.DistanceToNearestStore),
            AvgDailySaleInNearbyStores: parseFloat(rec.AvgDailySaleInNearbyStores),
          }
        })
        console.log(`Inserted: ${rec.ItemName}`)
      } catch (e) {
        console.error(`Error inserting ${rec.ItemName}:`, e)
      }
    }

    console.log('Seeding completed.')
    await prisma.$disconnect()
  })
}

main().catch(e => {
  console.error(e)
  prisma.$disconnect()
})
