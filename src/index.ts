import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Get all users
app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get user by id
app.get("/users/:id", async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.json(user);
});

// Create user
app.post("/users", async (req: Request, res: Response) => {
  const user = await prisma.user.create({ data: req.body });
  res.json(user);
});

// Update user
app.put("/users/:id", async (req: Request, res: Response) => {
  const user = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(user);
});

// Delete user
app.delete("/users/:id", async (req: Request, res: Response) => {
  const user = await prisma.user.delete({
    where: { id: Number(req.params.id) },
  });
  res.json(user);
});

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
