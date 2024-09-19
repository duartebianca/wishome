import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Wishome API with TypeScript!');
});

// Route for creating a user
app.post('/users', async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        role,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Example gifts route
app.get("/api/gifts", (req: Request, res: Response) => {
  const gifts = [
    { id: 1, name: "Gift 1", price: 100 },
    { id: 2, name: "Gift 2", price: 200 },
  ];
  res.json(gifts);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
