import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { getDb } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDb();
    const employees = db.prepare(
      'SELECT id, email, name, emp_id, designation, department, phone, join_date, salary, status, created_at FROM users WHERE role = ? ORDER BY created_at DESC'
    ).all('employee');

    return NextResponse.json({ employees });
  } catch (error) {
    console.error('Get employees error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { email, name, designation, department, phone, salary, join_date } = body;

    if (!email || !name || !designation || !department) {
      return NextResponse.json({ error: 'Required fields: email, name, designation, department' }, { status: 400 });
    }

    const db = getDb();

    // Check if email already exists
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return NextResponse.json({ error: 'Employee with this email already exists' }, { status: 409 });
    }

    // Generate employee ID
    const count = db.prepare('SELECT COUNT(*) as count FROM users WHERE role = ?').get('employee') as any;
    const empId = `KOF-EMP-${String(count.count + 1).padStart(3, '0')}`;

    // Default password
    const defaultPassword = bcrypt.hashSync('kof@2024', 10);
    const id = uuid();

    db.prepare(`
      INSERT INTO users (id, email, password, role, name, emp_id, designation, department, phone, join_date, salary)
      VALUES (?, ?, ?, 'employee', ?, ?, ?, ?, ?, ?, ?)
    `).run(id, email, defaultPassword, name, empId, designation, department, phone || '', join_date || new Date().toISOString().split('T')[0], salary || 0);

    return NextResponse.json({
      message: 'Employee created successfully',
      employee: { id, email, name, emp_id: empId, designation, department, phone, salary, join_date },
      defaultPassword: 'kof@2024',
    }, { status: 201 });
  } catch (error) {
    console.error('Create employee error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
