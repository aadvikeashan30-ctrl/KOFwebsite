import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const jobs = db.prepare("SELECT id, title, department, location, type, description, requirements, salary_range, deadline FROM recruitments WHERE status = 'active' ORDER BY created_at DESC").all();
    return NextResponse.json({ jobs });
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}
