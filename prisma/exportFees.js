const { PrismaClient } = require("@prisma/client");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const prisma = new PrismaClient();

async function exportComplaint() {

    const complaints = await prisma.complaint.findMany();

    const csvWriter = createCsvWriter({
        path: "complaint.csv",
        header: [
            { id: "id", title: "ID" },
            { id: "students_id", title: "STUDENT_ID" },
            { id: "category", title: "CATEGORY" },
            { id: "description", title: "DESCRIPTION" },
            { id: "status", title: "STATUS" }
        ]
    });

    await csvWriter.writeRecords(complaints);

    console.log("Complaint exported successfully.");
}

exportComplaint()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });