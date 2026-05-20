import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const db = getDb();
    const prices = db.prepare('SELECT * FROM pricing ORDER BY product_name').all();
    return NextResponse.json({ prices });
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const { id, retail_price, bulk_price, tin_price } = body;
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const db = getDb();
    db.prepare("UPDATE pricing SET retail_price = ?, bulk_price = ?, tin_price = ?, updated_at = datetime('now'), updated_by = ? WHERE id = ?")
      .run(retail_price, bulk_price, tin_price, user.id, id);
    return NextResponse.json({ message: 'Price updated successfully' });
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}
