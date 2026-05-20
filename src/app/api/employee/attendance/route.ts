import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import { getDb } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month') || new Date().toISOString().slice(0, 7); // YYYY-MM

    const db = getDb();
    const attendance = db.prepare(
      "SELECT * FROM attendance WHERE employee_id = ? AND date LIKE ? ORDER BY date ASC"
    ).all(user.id, `${month}%`);

    // Stats
    const stats = {
      present: attendance.filter((a: any) => a.status === 'present').length,
      absent: attendance.filter((a: any) => a.status === 'absent').length,
      half_day: attendance.filter((a: any) => a.status === 'half_day').length,
      on_leave: attendance.filter((a: any) => a.status === 'on_leave').length,
      total: attendance.length,
    };

    return NextResponse.json({ attendance, stats });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { action } = body; // 'check_in' or 'check_out'
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toTimeString().slice(0, 5);

    const db = getDb();
    const existing = db.prepare('SELECT * FROM attendance WHERE employee_id = ? AND date = ?').get(user.id, today) as any;

    if (action === 'check_in') {
      if (existing) {
        return NextResponse.json({ error: 'Already checked in today' }, { status: 400 });
      }
      db.prepare('INSERT INTO attendance (id, employee_id, date, check_in, status) VALUES (?, ?, ?, ?, ?)').run(
        uuid(), user.id, today, now, 'present'
      );
      return NextResponse.json({ message: 'Checked in successfully', time: now });
    }

    if (action === 'check_out') {
      if (!existing) {
        return NextResponse.json({ error: 'Not checked in today' }, { status: 400 });
      }
      if (existing.check_out) {
        return NextResponse.json({ error: 'Already checked out' }, { status: 400 });
      }
      db.prepare('UPDATE attendance SET check_out = ? WHERE id = ?').run(now, existing.id);
      return NextResponse.json({ message: 'Checked out successfully', time: now });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
