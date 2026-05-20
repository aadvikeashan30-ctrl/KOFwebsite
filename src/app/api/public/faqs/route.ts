import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const faqs = db.prepare(
      'SELECT * FROM faqs WHERE published = 1 ORDER BY sort_order ASC, created_at DESC'
    ).all();
    return NextResponse.json({ faqs });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
