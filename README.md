# 🏨 Hostel Management API

A RESTful backend API for managing hostel operations such as student records, room allocation, complaints, fees, and food menu management.

---

## 📖 Project Overview

The Hostel Management API is a backend application developed using Node.js and Express.js. It provides REST APIs to perform CRUD operations for various hostel management activities.

The application uses Prisma ORM to interact with a PostgreSQL database and is containerized using Docker. It can be deployed using Kubernetes and automated with GitHub Actions.

---

## 🚀 Features

- Student Management
- Room Management
- Complaint Management
- Fee Management
- Food Menu Management
- Search Students
- Filter Students
- Pagination
- Sorting
- Health Check API
- RESTful API Design

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|----------|
| Node.js | JavaScript Runtime |
| Express.js | Web Framework |
| PostgreSQL | Database |
| Prisma ORM | Database ORM |
| Docker | Containerization |
| PM2 | Process Manager |
| GitHub Actions | CI/CD |
| Kubernetes | Container Orchestration |
| Git | Version Control |

---

# Project Structure

```
Hostel-demo/

├── prisma/
│   ├── schema.prisma
│   └── seed.js
│
├── node_modules/
│
├── index.js
├── package.json
├── package-lock.json
├── .env
├── README.md
└── complaint.csv
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/<your-username>/<repository-name>.git

cd Hostel-demo
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file.

```env
DATABASE_URL="postgresql://username:password@host:5432/database"
PORT=3000
```

---

## Generate Prisma Client

```bash
npx prisma generate
```

---

## Push Database Schema

```bash
npx prisma db push
```

---

## Seed Database

```bash
node prisma/seed.js
```

---

## Start Application

```bash
node index.js
```

or

```bash
npm start
```

Server starts on

```
http://localhost:3000
```

---

# API Endpoints

## Health Check

```
GET /health
```

---

## Home

```
GET /
```

---

## Students

### Get All Students

```
GET /students
```

Supports

- Pagination
- Filtering
- Sorting

Example

```
GET /students?page=1&limit=10
```

---

### Get Student by Department

```
GET /students/department/:department
```

Example

```
GET /students/department/CSE
```

---

### Search Students

```
GET /students/search?q=arun
```

---

### Create Student

```
POST /students
```

Sample Body

```json
{
    "name": "Arun",
    "email": "arun@gmail.com",
    "department": "CSE",
    "year": 3
}
```

---

### Update Student

```
PUT /students/:id
```

---

### Delete Student

```
DELETE /students/:id
```

---

## Rooms

```
GET /rooms
```

---

## Complaints

```
GET /complaints
```

---

## Fees

```
GET /fees
```

---

# Prisma Commands

Generate Client

```bash
npx prisma generate
```

Push Schema

```bash
npx prisma db push
```

Open Prisma Studio

```bash
npx prisma studio
```

Seed Database

```bash
node prisma/seed.js
```

---

# Docker

Build Image

```bash
docker build -t hostel-api .
```

Run Container

```bash
docker run -p 3000:3000 hostel-api
```

Docker Compose

```bash
docker compose up
```

---

# PM2

Start

```bash
pm2 start index.js --name hostel-api
```

View Processes

```bash
pm2 list
```

Restart

```bash
pm2 restart hostel-api
```

Stop

```bash
pm2 stop hostel-api
```

Delete

```bash
pm2 delete hostel-api
```

---

# Kubernetes

Deploy Application

```bash
kubectl apply -f deployment.yaml
```

Deploy Service

```bash
kubectl apply -f service.yaml
```

Deploy Ingress

```bash
kubectl apply -f ingress.yaml
```

Check Pods

```bash
kubectl get pods
```

Check Services

```bash
kubectl get svc
```

Check Deployments

```bash
kubectl get deployments
```

---

# Testing

The APIs can be tested using

- Postman
- cURL

Example

```bash
curl http://localhost:3000/students
```

---

# Performance

The application was tested using

- PM2
- Autocannon

Example

```bash
autocannon -c 100 -d 10 http://localhost:3000/students
```

---

# Future Enhancements

- JWT Authentication
- Role-Based Authorization
- Redis Caching
- Email Notifications
- File Uploads
- Swagger API Documentation
- Unit Testing
- Logging
- Monitoring

---

# Author

**Gnanasundar K**

Backend Developer

---

# License

This project is developed for learning and demonstration purposes.

Testing GitHub Actions 