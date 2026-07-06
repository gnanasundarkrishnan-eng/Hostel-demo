const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding started...");

  // ==========================
  // 1️⃣ USER
  // ==========================
  const user = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin" + Date.now() + "@gmail.com",
      password: "123456",
      role: "ADMIN",
    },
  });

  console.log("✅ User created:", user.id);

  // ==========================
  // 2️⃣ ROOM 1
  // ==========================
  const room1 = await prisma.room.create({
    data: {
      room_number: "A101",
      block: "A",
      capacity: 4,
      occupied: 2,
    },
  });

  console.log("✅ Room 1 created:", room1.id);

  // ==========================
  // 3️⃣ ROOM 2
  // ==========================
  const room2 = await prisma.room.create({
    data: {
      room_number: "A102",
      block: "A",
      capacity: 4,
      occupied: 1,
    },
  });

  console.log("✅ Room 2 created:", room2.id);

  // ==========================
  // 4️⃣ STUDENTS
  // ==========================
  const student1 = await prisma.student.create({
    data: {
      name: "Arun",
      email: "arun" + Date.now() + "@gmail.com",
      department: "CSE",
      year: 3,
      status: "ACTIVE",
      room_id: room1.id,
    },
  });

  const student2 = await prisma.student.create({
    data: {
      name: "Kumar",
      email: "kumar" + Date.now() + "@gmail.com",
      department: "ECE",
      year: 2,
      status: "ACTIVE",
      room_id: room1.id,
    },
  });

  const student3 = await prisma.student.create({
    data: {
      name: "Priya",
      email: "priya" + Date.now() + "@gmail.com",
      department: "CSE",
      year: 4,
      status: "ACTIVE",
      room_id: room2.id,
    },
  });

  console.log("✅ Students created");

  // ==========================
  // 5️⃣ FEES
  // ==========================
  const students = [student1, student2, student3];

  for (const student of students) {
    await prisma.fee.create({
      data: {
        student_id: student.id,
        amount: 5000,
        status: "PAID",
      },
    });
  }

  console.log("✅ Fees created");

  // ==========================
  // 6️⃣ COMPLAINTS
  // ==========================
  await prisma.complaint.create({
    data: {
      student_id: student1.id,
      category: "Cleaning",
      description: "Room not cleaned properly",
      status: "OPEN",
    },
  });

  await prisma.complaint.create({
    data: {
      student_id: student2.id,
      category: "Electricity",
      description: "Fan not working",
      status: "OPEN",
    },
  });

  await prisma.complaint.create({
    data: {
      student_id: student3.id,
      category: "Maintenance",
      description: "Water leakage",
      status: "CLOSED",
    },
  });

  console.log("✅ Complaints created");

  // ==========================
  // 7️⃣ FOOD MENU
  // ==========================
  await prisma.foodMenu.create({
    data: {
      day: "Monday",
      breakfast: "Idly",
      lunch: "Rice",
      dinner: "Chapati",
    },
  });

  console.log("✅ Food Menu created");

  console.log("🎉 SEED COMPLETED SUCCESSFULLY");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });