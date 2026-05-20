import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDb();
    const payslips = db.prepare(
      'SELECT * FROM payslips WHERE employee_id = ? ORDER BY year DESC, generated_date DESC'
    ).all(user.id);

    return NextResponse.json({ payslips });
  } catch (error) {
    console.error('Get payslips error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
