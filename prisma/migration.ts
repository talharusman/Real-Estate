// This is a script you would run to apply the migration
// Save this as a separate file and run it with: npx ts-node prisma/migration.ts

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Add the purpose field with a default value of "sale" to all existing properties
  await prisma.$executeRaw`ALTER TABLE Property ADD COLUMN purpose TEXT DEFAULT 'sale' NOT NULL`

  console.log("Migration completed successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

