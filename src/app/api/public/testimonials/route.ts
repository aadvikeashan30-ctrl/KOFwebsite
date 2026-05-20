import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const testimonials = db.prepare(
      'SELECT * FROM testimonials WHERE published = 1 ORDER BY sort_order ASC, created_at DESC'
    ).all();
    return NextResponse.json({ testimonials });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
