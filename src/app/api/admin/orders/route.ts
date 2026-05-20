import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import { getDb } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDb();
    const orders = db.prepare(`
      SELECT o.*, u.name as assigned_name FROM orders o 
      LEFT JOIN users u ON o.assigned_to = u.id 
      ORDER BY o.created_at DESC
    `).all();

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { customer_name, customer_phone, product, quantity, unit, rate, district, assigned_to } = body;

    if (!customer_name || !product || !quantity || !rate) {
      return NextResponse.json({ error: 'Required: customer_name, product, quantity, rate' }, { status: 400 });
    }

    const db = getDb();
    const id = uuid();
    const orderCount = db.prepare('SELECT COUNT(*) as count FROM orders').get() as any;
    const orderNumber = `KOF-ORD-${String(orderCount.count + 1).padStart(5, '0')}`;
    const totalAmount = quantity * rate;

    db.prepare(`
      INSERT INTO orders (id, order_number, customer_name, customer_phone, product, quantity, unit, rate, total_amount, district, assigned_to)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, orderNumber, customer_name, customer_phone || '', product, quantity, unit || 'litres', rate, totalAmount, district || '', assigned_to || null);

    return NextResponse.json({ message: 'Order created successfully', id, order_number: orderNumber }, { status: 201 });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
