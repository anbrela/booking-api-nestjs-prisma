import fs from 'fs';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  fs.createReadStream('prisma/worldcities.csv')
    .pipe(csv())
    .on('data', async (row) => {
      // Verificar si la población de la ciudad es mayor que 100.000

      const population = parseInt(row.population) || 0;
      if (population > 70000) {
        // Verificar si el país ya existe en la base de datos
        const existingCountry = await prisma.country.findUnique({
          where: { id: row.iso2 },
        });
        let countryId;

        // Si el país no existe, crearlo
        if (!existingCountry && row?.iso2) {
          const newCountry = await prisma.country.create({
            data: { name: row.country, id: row.iso2 },
          });
          countryId = newCountry.id;
        } else {
          countryId = existingCountry.id;
        }

        const existingCity = await prisma.city.findUnique({
          where: { id: row.id },
        });

        if (!existingCity && row?.id) {
          // Crear ciudad
          await prisma.city.create({
            data: {
              name: row.city_ascii,
              id: row.id,
              country: { connect: { id: countryId } },
              latitude: parseFloat(row.lat),
              longitude: parseFloat(row.lng),
            },
          });
        }
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });

  const rolesToAdd = ['ADMINISTRATOR', 'USER', 'CREATOR'];

  const existingRoles = await prisma.role.findMany();

  const rolesToAddFiltered = rolesToAdd.filter(
    (role) => !existingRoles.some((existingRole) => existingRole.role === role),
  );

  if (rolesToAddFiltered?.length) {
    await prisma.role.createMany({
      data: rolesToAddFiltered.map((role) => ({ role })),
    });
  }

  const adminCity = await prisma.city.findFirst({
    where: { name: 'Lugo' },
  });

  if (!adminCity) {
    throw new Error('Admin city not found');
  }

  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      password: 'admin1234',
      name: 'admin',
      createdAt: new Date(),
      isCreator: false,
      roles: {
        connect: {
          role: 'ADMINISTRATOR',
        },
      },
      about: "I'm the admin of this app",
      city: {
        connect: {
          id: adminCity.id,
        },
      },
      avatar: 'image',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
