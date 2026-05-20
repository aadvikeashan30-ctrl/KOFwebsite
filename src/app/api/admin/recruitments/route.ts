import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import { getDb } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const db = getDb();
    const jobs = db.prepare('SELECT * FROM recruitments ORDER BY created_at DESC').all();
    return NextResponse.json({ jobs });
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const { title, department, location, type, description, requirements, salary_range, deadline } = body;
    if (!title || !department || !location) return NextResponse.json({ error: 'Title, department, location required' }, { status: 400 });
    const db = getDb();
    const id = uuid();
    db.prepare('INSERT INTO recruitments (id, title, department, location, type, description, requirements, salary_range, deadline, created_by) VALUES (?,?,?,?,?,?,?,?,?,?)')
      .run(id, title, department, location, type || 'Full-time', description || '', requirements || '', salary_range || '', deadline || '', user.id);
    return NextResponse.json({ message: 'Job posted', id }, { status: 201 });
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const db = getDb();
    db.prepare('DELETE FROM recruitments WHERE id = ?').run(id);
    return NextResponse.json({ message: 'Deleted' });
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}
