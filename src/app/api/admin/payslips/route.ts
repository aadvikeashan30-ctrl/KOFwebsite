import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import { getDb } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const year = searchParams.get('year');
    const employeeId = searchParams.get('employee_id');

    const db = getDb();
    let query = `
      SELECT p.*, u.name as employee_name, u.emp_id, u.department, u.designation 
      FROM payslips p JOIN users u ON p.employee_id = u.id WHERE 1=1
    `;
    const params: any[] = [];

    if (month) { query += ' AND p.month = ?'; params.push(month); }
    if (year) { query += ' AND p.year = ?'; params.push(parseInt(year)); }
    if (employeeId) { query += ' AND p.employee_id = ?'; params.push(employeeId); }

    query += ' ORDER BY p.year DESC, p.generated_date DESC';

    const payslips = db.prepare(query).all(...params);
    return NextResponse.json({ payslips });
  } catch (error) {
    console.error('Get payslips error:', error);
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
    const { employee_id, month, year, basic_salary, hra, da, ta, pf_deduction, tax_deduction, other_deductions, bonus } = body;

    if (!employee_id || !month || !year || !basic_salary) {
      return NextResponse.json({ error: 'Required: employee_id, month, year, basic_salary' }, { status: 400 });
    }

    const net_salary = (basic_salary + (hra || 0) + (da || 0) + (ta || 0) + (bonus || 0)) - 
                       ((pf_deduction || 0) + (tax_deduction || 0) + (other_deductions || 0));

    const db = getDb();
    const id = uuid();

    db.prepare(`
      INSERT INTO payslips (id, employee_id, month, year, basic_salary, hra, da, ta, pf_deduction, tax_deduction, other_deductions, bonus, net_salary)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, employee_id, month, year, basic_salary, hra || 0, da || 0, ta || 0, pf_deduction || 0, tax_deduction || 0, other_deductions || 0, bonus || 0, net_salary);

    return NextResponse.json({ message: 'Payslip generated successfully', id, net_salary }, { status: 201 });
  } catch (error) {
    console.error('Create payslip error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
