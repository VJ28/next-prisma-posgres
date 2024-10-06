import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import { signupSchema } from '../../lib/validationSchemas';
import { ValidationError } from 'yup';

const prisma = new PrismaClient();

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Validate request body
      await signupSchema.validate(req.body);
      
      const { email, password } = req.body;
      // Check if the email already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      
      //Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hw", hashedPassword);
      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      console.log(newUser);
      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
