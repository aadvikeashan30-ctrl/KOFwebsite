import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'kof-chitradurga-secret-2024-secure-key';

export interface UserPayload {
  id: string;
  email: string;
  role: 'admin' | 'employee';
  name: string;
  emp_id: string;
}

export function generateToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
}

export function verifyToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('kof_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function requireAuth(role?: 'admin' | 'employee'): Promise<UserPayload> {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');
  if (role && user.role !== role) throw new Error('Forbidden');
  return user;
}
