const { PrismaClient } = require("@prisma/client");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const prisma = new PrismaClient();

async function exportStudents() {

    const students = await prisma.students.findMany();

    const csvWriter = createCsvWriter({
        path: "students.csv",
        header: [
            { id: "name", title: "NAME" },
            { id: "email", title: "EMAIL" },
            { id: "department", title: "DEPARTMENT" },
            { id: "year", title: "YEAR" }
        ]
    });

    await csvWriter.writeRecords(students);

    console.log("CSV Exported Successfully");
}

exportStudents()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });