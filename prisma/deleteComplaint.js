const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function deleteComplaint() {

    const result = await prisma.complaint.deleteMany();

    console.log(result);

    console.log("Complaint records deleted successfully.");

}

deleteComplaint()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });