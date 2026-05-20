import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const announcements = db.prepare(
      "SELECT id, title, content, type, created_at FROM announcements WHERE target IN ('all', 'public') AND published = 1 ORDER BY created_at DESC LIMIT 10"
    ).all();
    return NextResponse.json({ announcements });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
