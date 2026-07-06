const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    await prisma.students.deleteMany();

    console.log("All student records deleted.");
}

main()
.finally(async () => {
    await prisma.$disconnect();
});