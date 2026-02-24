import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  try {
    console.log('Ejecutando la seed...');

    const password = await bcrypt.hash('inventarteMaster', 10);

    const user = await prisma.user.upsert({
      where: { email: 'inventarte.master@yopmail.com' },
      update: {},
      create: {
        name: 'Master',
        email: 'inventarte.master@yopmail.com',
        idCard: 1234567890,
        password: password,
        role: 'MASTER',
      },
    });
    console.log('Usuario creado o actualizado', user);
  } catch (error) {
    console.error('Error al ejecutar la seed:', error);

    console.log('Desconectandose de la base de datos...');
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    console.log('Desconectandose de la base de datos...');

    await prisma.$disconnect();
  }
}

main();
