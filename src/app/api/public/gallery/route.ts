import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const db = getDb();
    let query = 'SELECT * FROM gallery WHERE published = 1';
    const queryParams: string[] = [];

    if (category) {
      query += ' AND category = ?';
      queryParams.push(category);
    }

    query += ' ORDER BY sort_order ASC, created_at DESC';

    const items = db.prepare(query).all(...queryParams);
    return NextResponse.json({ gallery: items });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
