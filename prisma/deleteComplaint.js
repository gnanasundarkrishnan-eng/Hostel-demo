const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function deleteComplaint() {
    console.log("Program started...");

    const result = await prisma.complaint.deleteMany();

    console.log("Delete result:", result);

    console.log("Complaint records deleted successfully.");
}

deleteComplaint()
    .catch((err) => {
        console.error("Error:", err);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });