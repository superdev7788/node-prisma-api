NodeJS + TypeScript + Prisma ORM + PostgreSQL REST API
A boilerplate REST API built with Node.js, Express, TypeScript, and Prisma ORM for PostgreSQL. Implements strong type safety, scalable patterns, and modern tooling.

Features
CRUD endpoints for User model

PostgreSQL integration via Prisma ORM

TypeScript for robust development

Express.js server setup

Easy environment configuration

Getting Started
Prerequisites
Node.js v18+ recommended

PostgreSQL installed locally or available via Docker

npm package manager

Installation
Clone the repository

bash
git clone <your-repo-url>
cd <project-folder>
Install dependencies

bash
npm install
Configure environment

Copy .env.example to .env

Set your DATABASE_URL (example: postgresql://postgres:password@localhost:5432/mydb?schema=public)

Database Setup
Initialize Prisma

bash
npx prisma init
Setup User model in prisma/schema.prisma:

text
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
Run migrations

bash
npx prisma migrate dev --name init
Generate Prisma client

bash
npx prisma generate
Running the API
bash
npm run dev
API server by default runs at http://localhost:3000

API Endpoints & Examples
Method	Endpoint	Description	Example Curl Command
GET	/users	List all users	curl http://localhost:3000/users
GET	/users/:id	Get user by ID	curl http://localhost:3000/users/1
POST	/users	Create new user	curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice","email":"alice@example.com"}' http://localhost:3000/users
PUT	/users/:id	Update user by ID	curl -X PUT -H "Content-Type: application/json" -d '{"name":"Bob","email":"bob@example.com"}' http://localhost:3000/users/1
DELETE	/users/:id	Delete user by ID	curl -X DELETE http://localhost:3000/users/1
Project Structure
text
src/
  index.ts          # Express server with routes
prisma/
  schema.prisma     # Prisma data models
.env                # Environment configuration
Example Code (Express + TypeScript + Prisma)
typescript
import express from "express";
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/users", async (req: Request, res: Response) => {
  const user = await prisma.user.create({ data: req.body });
  res.json(user);
});

// ...GET, PUT, DELETE endpoints similar to above

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
License
MIT