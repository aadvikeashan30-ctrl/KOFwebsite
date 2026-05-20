import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const db = getDb();
    const employee = db.prepare(
      'SELECT id, email, name, emp_id, designation, department, phone, join_date, salary, status, created_at FROM users WHERE id = ? AND role = ?'
    ).get(id, 'employee');

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json({ employee });
  } catch (error) {
    console.error('Get employee error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, designation, department, phone, salary, status } = body;

    const db = getDb();
    db.prepare(`
      UPDATE users SET name = COALESCE(?, name), designation = COALESCE(?, designation), 
      department = COALESCE(?, department), phone = COALESCE(?, phone), 
      salary = COALESCE(?, salary), status = COALESCE(?, status), updated_at = datetime('now')
      WHERE id = ? AND role = 'employee'
    `).run(name, designation, department, phone, salary, status, id);

    return NextResponse.json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Update employee error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const db = getDb();
    db.prepare('UPDATE users SET status = ? WHERE id = ? AND role = ?').run('inactive', id, 'employee');

    return NextResponse.json({ message: 'Employee deactivated successfully' });
  } catch (error) {
    console.error('Delete employee error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    if (body.action === 'reset_password') {
      const newPassword = body.password || 'kof@2024';
      const hashed = bcrypt.hashSync(newPassword, 10);
      const db = getDb();
      db.prepare('UPDATE users SET password = ?, updated_at = datetime(\'now\') WHERE id = ?').run(hashed, id);
      return NextResponse.json({ message: 'Password reset successfully', newPassword });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Patch employee error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
