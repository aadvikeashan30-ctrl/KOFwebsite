import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import { getDb } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDb();
    const leaves = db.prepare(
      'SELECT * FROM leaves WHERE employee_id = ? ORDER BY applied_date DESC'
    ).all(user.id);

    // Calculate leave balance
    const approved = db.prepare(
      'SELECT leave_type, SUM(days) as total_days FROM leaves WHERE employee_id = ? AND status = ? AND start_date >= ? GROUP BY leave_type'
    ).all(user.id, 'approved', `${new Date().getFullYear()}-01-01`);

    const leaveBalance = {
      casual: 12,
      sick: 12,
      earned: 15,
      used: {
        casual: 0,
        sick: 0,
        earned: 0,
      }
    };

    (approved as any[]).forEach((item: any) => {
      if (item.leave_type in leaveBalance.used) {
        (leaveBalance.used as any)[item.leave_type] = item.total_days;
      }
    });

    return NextResponse.json({ leaves, leaveBalance });
  } catch (error) {
    console.error('Get leaves error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { leave_type, start_date, end_date, reason } = body;

    if (!leave_type || !start_date || !end_date) {
      return NextResponse.json({ error: 'Required: leave_type, start_date, end_date' }, { status: 400 });
    }

    // Calculate days
    const start = new Date(start_date);
    const end = new Date(end_date);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    if (days <= 0) {
      return NextResponse.json({ error: 'End date must be after start date' }, { status: 400 });
    }

    const db = getDb();
    const id = uuid();

    db.prepare(`
      INSERT INTO leaves (id, employee_id, leave_type, start_date, end_date, days, reason)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, user.id, leave_type, start_date, end_date, days, reason || '');

    return NextResponse.json({ message: 'Leave application submitted successfully', id }, { status: 201 });
  } catch (error) {
    console.error('Apply leave error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
