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

    const totalEmployees = (db.prepare('SELECT COUNT(*) as count FROM users WHERE role = ? AND status = ?').get('employee', 'active') as any).count;
    const totalOrders = (db.prepare('SELECT COUNT(*) as count FROM orders').get() as any).count;
    const pendingLeaves = (db.prepare('SELECT COUNT(*) as count FROM leaves WHERE status = ?').get('pending') as any).count;
    const totalRevenue = (db.prepare('SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status != ?').get('cancelled') as any).total;
    const recentOrders = db.prepare(`
      SELECT o.*, u.name as assigned_name FROM orders o 
      LEFT JOIN users u ON o.assigned_to = u.id 
      ORDER BY o.created_at DESC LIMIT 5
    `).all();
    const recentLeaves = db.prepare(`
      SELECT l.*, u.name as employee_name, u.emp_id FROM leaves l 
      JOIN users u ON l.employee_id = u.id 
      ORDER BY l.applied_date DESC LIMIT 5
    `).all();
    const departmentStats = db.prepare(`
      SELECT department, COUNT(*) as count FROM users WHERE role = 'employee' AND status = 'active' GROUP BY department
    `).all();

    return NextResponse.json({
      stats: {
        totalEmployees,
        totalOrders,
        pendingLeaves,
        totalRevenue,
      },
      recentOrders,
      recentLeaves,
      departmentStats,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
