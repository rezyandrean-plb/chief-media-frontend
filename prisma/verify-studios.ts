import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const studios = await prisma.studio.findMany()
  console.log(`Found ${studios.length} studios in the database:`)
  studios.forEach(studio => {
    console.log(`- ${studio.name} (${studio.location}) - $${studio.hourlyRate}/hour`)
  })
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })



