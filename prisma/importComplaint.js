const fs = require("fs");
const csv = require("csv-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const complaints = [];

fs.createReadStream("complaint.csv")
    .pipe(csv())
    .on("data", (row) => {

        complaints.push({
            id: parseInt(row.ID),
            students_id: row.STUDENT_ID ? parseInt(row.STUDENT_ID) : null,
            category: row.CATEGORY,
            description: row.DESCRIPTION,
            status: row.STATUS
        });

    })
    .on("end", async () => {

        await prisma.complaint.createMany({
            data: complaints
        });

        console.log("Complaint records restored successfully.");

        await prisma.$disconnect();

    });