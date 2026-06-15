import { PrismaClient, UserRole, MachineType, ServiceType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const ownerPassword = await bcrypt.hash('owner123', 10);
  const staffPassword = await bcrypt.hash('staff123', 10);

  // 1. Owner
  const owner = await prisma.user.upsert({
    where: { email: 'owner@gmail.com' },
    update: {},
    create: {
      name: 'Owner',
      email: 'owner@gmail.com',
      password_hash: ownerPassword,
      role: UserRole.OWNER,
    },
  });

  // 2. Branch (Check if exists first to avoid duplicates since no unique constraint on name)
  let branch = await prisma.branch.findFirst({
    where: { name: 'Cabang Utama' }
  });

  if (!branch) {
    branch = await prisma.branch.create({
      data: {
        name: 'Cabang Utama',
        address: 'Jl. Utama No. 1',
        created_by: owner.id,
      },
    });
  }

  // 3. Staff
  await prisma.user.upsert({
    where: { email: 'staff@gmail.com' },
    update: {},
    create: {
      name: 'Staff',
      email: 'staff@gmail.com',
      password_hash: staffPassword,
      role: UserRole.STAFF,
      branch_id: branch.id,
      created_by: owner.id,
    },
  });

  // 4. Machines
  const existingMachines = await prisma.machine.count({
    where: { branch_id: branch.id }
  });

  if (existingMachines === 0) {
    await prisma.machine.createMany({
      data: [
        { name: 'Mesin Cuci 1', type: MachineType.WASHER, branch_id: branch.id, created_by: owner.id },
        { name: 'Mesin Pengering 1', type: MachineType.DRYER, branch_id: branch.id, created_by: owner.id },
      ],
    });
  }

  // 5. Service Prices
  // Since service_type is unique, we can use upsert or skipDuplicates
  await prisma.servicePrice.createMany({
    data: [
      { service_type: ServiceType.CA, price: 5000, created_by: owner.id },
      { service_type: ServiceType.CK, price: 4000, created_by: owner.id },
      { service_type: ServiceType.KA, price: 6000, created_by: owner.id },
    ],
    skipDuplicates: true,
  });

  // 6. Inventory Items
  await prisma.inventoryItem.createMany({
    data: [
      { name: 'Deterjen', unit: 'sachet', unit_price: 1000, created_by: owner.id },
      { name: 'Pelembut', unit: 'sachet', unit_price: 1000, created_by: owner.id },
      { name: 'Kantong Plastik', unit: 'pcs', unit_price: 500, created_by: owner.id },
    ],
    skipDuplicates: true,
  });

  console.log('Seed data successfully generated.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
