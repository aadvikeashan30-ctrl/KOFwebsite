import Database from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

const DB_PATH = path.join(process.cwd(), 'kof.db');

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initializeDatabase();
  }
  return db;
}

function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin', 'employee')),
      name TEXT NOT NULL,
      emp_id TEXT UNIQUE,
      designation TEXT,
      department TEXT,
      phone TEXT,
      join_date TEXT,
      salary REAL DEFAULT 0,
      status TEXT DEFAULT 'active' CHECK(status IN ('active', 'inactive')),
      avatar_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS payslips (
      id TEXT PRIMARY KEY,
      employee_id TEXT NOT NULL,
      month TEXT NOT NULL,
      year INTEGER NOT NULL,
      basic_salary REAL NOT NULL,
      hra REAL DEFAULT 0,
      da REAL DEFAULT 0,
      ta REAL DEFAULT 0,
      pf_deduction REAL DEFAULT 0,
      tax_deduction REAL DEFAULT 0,
      other_deductions REAL DEFAULT 0,
      bonus REAL DEFAULT 0,
      net_salary REAL NOT NULL,
      status TEXT DEFAULT 'generated' CHECK(status IN ('generated', 'paid')),
      generated_date TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS leaves (
      id TEXT PRIMARY KEY,
      employee_id TEXT NOT NULL,
      leave_type TEXT NOT NULL CHECK(leave_type IN ('casual', 'sick', 'earned', 'maternity', 'paternity', 'unpaid')),
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      days INTEGER NOT NULL,
      reason TEXT,
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
      applied_date TEXT DEFAULT (datetime('now')),
      reviewed_by TEXT,
      review_date TEXT,
      FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      order_number TEXT UNIQUE NOT NULL,
      customer_name TEXT NOT NULL,
      customer_phone TEXT,
      product TEXT NOT NULL,
      quantity REAL NOT NULL,
      unit TEXT DEFAULT 'litres',
      rate REAL NOT NULL,
      total_amount REAL NOT NULL,
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'processing', 'dispatched', 'delivered', 'cancelled')),
      assigned_to TEXT,
      district TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (assigned_to) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS attendance (
      id TEXT PRIMARY KEY,
      employee_id TEXT NOT NULL,
      date TEXT NOT NULL,
      check_in TEXT,
      check_out TEXT,
      status TEXT DEFAULT 'present' CHECK(status IN ('present', 'absent', 'half_day', 'on_leave')),
      FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(employee_id, date)
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT DEFAULT 'info',
      read INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // Create default admin if not exists
  const adminExists = db.prepare('SELECT id FROM users WHERE role = ?').get('admin');
  if (!adminExists) {
    const hashedPassword = bcrypt.hashSync('admin@kof2024', 10);
    db.prepare(`
      INSERT INTO users (id, email, password, role, name, emp_id, designation, department, phone, join_date, salary)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'admin-001',
      'admin@kofchitradurga.com',
      hashedPassword,
      'admin',
      'KOF Administrator',
      'KOF-ADMIN-001',
      'System Administrator',
      'Administration',
      '6366975382',
      '2010-01-01',
      0
    );
  }

  // Seed sample employees if none exist
  const employeeCount = db.prepare('SELECT COUNT(*) as count FROM users WHERE role = ?').get('employee') as any;
  if (employeeCount.count === 0) {
    seedSampleData();
  }
}

function seedSampleData() {
  const employees = [
    { id: 'emp-001', email: 'ashwini@kofchitradurga.com', name: 'Ashwini Kumar', emp_id: 'KOF-EMP-001', designation: 'Marketing Manager', department: 'Marketing', phone: '9876543201', salary: 45000 },
    { id: 'emp-002', email: 'rajesh@kofchitradurga.com', name: 'Rajesh Reddy', emp_id: 'KOF-EMP-002', designation: 'Production Supervisor', department: 'Production', phone: '9876543202', salary: 38000 },
    { id: 'emp-003', email: 'priya@kofchitradurga.com', name: 'Priya Sharma', emp_id: 'KOF-EMP-003', designation: 'Accounts Officer', department: 'Finance', phone: '9876543203', salary: 42000 },
    { id: 'emp-004', email: 'manjunath@kofchitradurga.com', name: 'Manjunath B', emp_id: 'KOF-EMP-004', designation: 'Field Officer', department: 'Procurement', phone: '9876543204', salary: 35000 },
    { id: 'emp-005', email: 'kavitha@kofchitradurga.com', name: 'Kavitha N', emp_id: 'KOF-EMP-005', designation: 'Quality Analyst', department: 'Quality', phone: '9876543205', salary: 40000 },
    { id: 'emp-006', email: 'suresh@kofchitradurga.com', name: 'Suresh Gowda', emp_id: 'KOF-EMP-006', designation: 'District Coordinator', department: 'Distribution', phone: '9876543206', salary: 36000 },
    { id: 'emp-007', email: 'lakshmi@kofchitradurga.com', name: 'Lakshmi Devi', emp_id: 'KOF-EMP-007', designation: 'HR Executive', department: 'Human Resources', phone: '9876543207', salary: 38000 },
    { id: 'emp-008', email: 'venkatesh@kofchitradurga.com', name: 'Venkatesh M', emp_id: 'KOF-EMP-008', designation: 'Store Manager', department: 'Warehouse', phone: '9876543208', salary: 34000 },
    { id: 'emp-009', email: 'deepa@kofchitradurga.com', name: 'Deepa R', emp_id: 'KOF-EMP-009', designation: 'Digital Marketing Lead', department: 'Marketing', phone: '9876543209', salary: 44000 },
    { id: 'emp-010', email: 'ramesh@kofchitradurga.com', name: 'Ramesh Kumar', emp_id: 'KOF-EMP-010', designation: 'Plant Engineer', department: 'Production', phone: '9876543210', salary: 48000 },
  ];

  const password = bcrypt.hashSync('kof@2024', 10);
  const insertUser = db.prepare(`
    INSERT INTO users (id, email, password, role, name, emp_id, designation, department, phone, join_date, salary)
    VALUES (?, ?, ?, 'employee', ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertPayslip = db.prepare(`
    INSERT INTO payslips (id, employee_id, month, year, basic_salary, hra, da, ta, pf_deduction, tax_deduction, other_deductions, bonus, net_salary, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertLeave = db.prepare(`
    INSERT INTO leaves (id, employee_id, leave_type, start_date, end_date, days, reason, status, applied_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const months = ['January', 'February', 'March', 'April', 'May', 'June'];

  const transaction = db.transaction(() => {
    for (const emp of employees) {
      insertUser.run(emp.id, emp.email, password, emp.name, emp.emp_id, emp.designation, emp.department, emp.phone, '2020-04-01', emp.salary);

      // Generate payslips for last 6 months
      for (let i = 0; i < months.length; i++) {
        const basic = emp.salary;
        const hra = basic * 0.2;
        const da = basic * 0.1;
        const ta = 2000;
        const pf = basic * 0.12;
        const tax = basic > 40000 ? basic * 0.05 : 0;
        const net = basic + hra + da + ta - pf - tax;
        insertPayslip.run(
          `payslip-${emp.id}-${i}`,
          emp.id,
          months[i],
          2026,
          basic, hra, da, ta, pf, tax, 0, 0, net,
          'paid'
        );
      }

      // Generate some leave records
      if (Math.random() > 0.3) {
        insertLeave.run(
          `leave-${emp.id}-1`,
          emp.id,
          'casual',
          '2026-03-15',
          '2026-03-17',
          3,
          'Personal work',
          'approved',
          '2026-03-10'
        );
      }
    }
  });

  transaction();
}
