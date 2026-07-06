const { PrismaClient } = require("@prisma/client");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const prisma = new PrismaClient();

async function exportFees() {

    const fees = await prisma.fees.findMany();

    const csvWriter = createCsvWriter({
        path: "fees.csv",
        header: [
            { id: "id", title: "ID" },
            { id: "students_id", title: "STUDENT_ID" },
            { id: "amount", title: "AMOUNT" },
            { id: "status", title: "STATUS" }
        ]
    });

    await csvWriter.writeRecords(fees);

    console.log("Fees exported successfully.");
}

exportFees()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });