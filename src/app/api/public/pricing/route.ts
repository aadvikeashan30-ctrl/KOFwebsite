import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const prices = db.prepare('SELECT product_name, product_id, retail_price, bulk_price, tin_price, updated_at FROM pricing ORDER BY product_name').all();
    return NextResponse.json({ prices });
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}
