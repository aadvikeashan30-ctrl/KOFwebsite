import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = getDb();
    const notifications = db.prepare(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 20'
    ).all(user.id);

    const unreadCount = (db.prepare(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND read = 0'
    ).get(user.id) as any).count;

    // Also get employee-targeted announcements
    const announcements = db.prepare(
      "SELECT id, title, content, type, created_at FROM announcements WHERE target IN ('all', 'employees') AND published = 1 ORDER BY created_at DESC LIMIT 5"
    ).all();

    return NextResponse.json({ notifications, unreadCount, announcements });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { id, action } = body;

    const db = getDb();
    if (action === 'mark_read' && id) {
      db.prepare('UPDATE notifications SET read = 1 WHERE id = ? AND user_id = ?').run(id, user.id);
    } else if (action === 'mark_all_read') {
      db.prepare('UPDATE notifications SET read = 1 WHERE user_id = ?').run(user.id);
    }

    return NextResponse.json({ message: 'Updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
