import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDb();

    const totalOrders = (db.prepare('SELECT COUNT(*) as count FROM orders').get() as any).count;
    const totalRevenue = (db.prepare("SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status != 'cancelled'").get() as any).total;
    const totalAnnouncements = (db.prepare('SELECT COUNT(*) as count FROM announcements WHERE published = 1').get() as any).count;
    const activeJobs = (db.prepare("SELECT COUNT(*) as count FROM recruitments WHERE status = 'active'").get() as any).count;

    const recentOrders = db.prepare(`
      SELECT * FROM orders ORDER BY created_at DESC LIMIT 5
    `).all();

    return NextResponse.json({
      stats: {
        totalOrders,
        totalRevenue,
        totalAnnouncements,
        activeJobs,
      },
      recentOrders,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
