import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginSchema } from '../../lib/validationSchemas';
import { ValidationError } from 'yup';

const prisma = new PrismaClient();

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await loginSchema.validate(req.body);

      const { email, password } = req.body;
      
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET as string, 
        { expiresIn: '1h' } // Expires in 1 hour
      );

      return res.status(200).json({ message: 'Login successful', token, "id": user.id });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: error });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}