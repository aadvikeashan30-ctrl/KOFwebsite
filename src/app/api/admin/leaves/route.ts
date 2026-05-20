import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const db = getDb();
    let query = `
      SELECT l.*, u.name as employee_name, u.emp_id, u.department 
      FROM leaves l JOIN users u ON l.employee_id = u.id WHERE 1=1
    `;
    const params: any[] = [];

    if (status) { query += ' AND l.status = ?'; params.push(status); }
    query += ' ORDER BY l.applied_date DESC';

    const leaves = db.prepare(query).all(...params);
    return NextResponse.json({ leaves });
  } catch (error) {
    console.error('Get leaves error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const db = getDb();
    db.prepare(`
      UPDATE leaves SET status = ?, reviewed_by = ?, review_date = datetime('now') WHERE id = ?
    `).run(status, user.id, id);

    return NextResponse.json({ message: `Leave ${status} successfully` });
  } catch (error) {
    console.error('Update leave error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
