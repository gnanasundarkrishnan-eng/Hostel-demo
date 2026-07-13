const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Hostel API Running 🚀");
});

// Get All Students (Filters + Pagination + Sorting)
app.get("/students", async (req, res) => {
  try {

    const {
      department,
      year,
      page = 1,
      limit = 10,
      sortBy = "id",
      order = "asc"
    } = req.query;

    const students = await prisma.student.findMany({

      where: {
        department: department || undefined,
        year: year ? Number(year) : undefined
      },

      orderBy: {
        [sortBy]: order
      },

      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),

      select: {
        id: true,
        name: true,
        email: true,
        department: true,
        year: true,
        status: true
      }

    });

    res.json(students);

  } catch (err) {
    console.error("Students API Error:", err);

    res.status(500).json({
      error: err.message
    });
  }
});
// Student Count
app.get("/students/count", async (req, res) => {
  try {

    const totalStudents = await prisma.student.count();

    res.json({
      totalStudents
    });

  } catch (err) {

    res.status(500).json({
      error: "Failed to count students"
    });

  }
});
// Get Students by Department
//localhost:3000/students/department/CSE
// ===============================
app.get("/students/department/:department", async (req, res) => {
  try {
    const { department } = req.params;

    const students = await prisma.student.findMany({
      where: {
        department: department
      },
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
        year: true,
        status: true
      }
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search Student
app.get("/students/search", async (req, res) => {
  try {
    const q = req.query.q || "";

    const result = await prisma.student.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } }
        ]
      }
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

// Create Student
app.post("/students", async (req, res) => {
  try {
    const { name, email, department, year, room_id } = req.body;

    const student = await prisma.student.create({
      data: {
        name,
        email,
        department,
        year,
        room_id,
        status: "ACTIVE"
      }
    });

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Create failed" });
  }
});

// Update Student Status
app.put("/students/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { name, email, department, year, room_id, status } = req.body;

    const updated = await prisma.student.update({
      where: { id },
      data: {
        name,
        email,
        department,
        year,
        room_id,
        status
      }
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// Delete Student
app.delete("/students/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.student.delete({
      where: { id }
    });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});
// Pending Fees
app.get("/fees/pending", async (req, res) => {

  try {

    const pendingFees = await prisma.fee.findMany({

      where: {
        status: "PENDING"
      },

      include: {
        student: true
      }

    });

    res.json(pendingFees);

  } catch (err) {

    res.status(500).json({
      error: "Failed to fetch pending fees"
    });

  }

});

// Open Complaints
app.get("/complaints/open", async (req, res) => {

  try {

    const complaints = await prisma.complaint.findMany({

      where: {
        status: "OPEN"
      },

      include: {
        student: true
      }

    });

    res.json(complaints);

  } catch (err) {

    res.status(500).json({
      error: "Failed to fetch complaints"
    });

  }

});
// Get Students with Room Details
app.get("/students-with-room", async (req, res) => {
  try {
    const data = await prisma.student.findMany({
      include: {
        room: true
      }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch join data"
    });
  }
});

// Room Occupancy
app.get("/rooms", async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        students: true
      }
    });

    res.json(rooms);

  } catch (err) {
    console.error("Rooms API Error:", err);

    res.status(500).json({
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});