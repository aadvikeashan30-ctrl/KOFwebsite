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
    initializeNewTables();
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

    CREATE TABLE IF NOT EXISTS announcements (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      type TEXT DEFAULT 'general' CHECK(type IN ('general', 'tender', 'news', 'urgent')),
      target TEXT DEFAULT 'all' CHECK(target IN ('all', 'employees', 'public')),
      published INTEGER DEFAULT 1,
      created_by TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      expires_at TEXT,
      FOREIGN KEY (created_by) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS pricing (
      id TEXT PRIMARY KEY,
      product_name TEXT NOT NULL,
      product_id TEXT NOT NULL,
      retail_price REAL NOT NULL,
      bulk_price REAL NOT NULL,
      tin_price REAL NOT NULL,
      unit TEXT DEFAULT 'per litre',
      updated_at TEXT DEFAULT (datetime('now')),
      updated_by TEXT,
      FOREIGN KEY (updated_by) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS recruitments (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      department TEXT NOT NULL,
      location TEXT NOT NULL,
      type TEXT DEFAULT 'Full-time',
      description TEXT,
      requirements TEXT,
      salary_range TEXT,
      deadline TEXT,
      status TEXT DEFAULT 'active' CHECK(status IN ('active', 'closed', 'draft')),
      created_by TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (created_by) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      sort_order INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Seed pricing if empty
  const pricingCount = (db.prepare('SELECT COUNT(*) as count FROM pricing').get() as any).count;
  if (pricingCount === 0) {
    const insertPrice = db.prepare('INSERT INTO pricing (id, product_name, product_id, retail_price, bulk_price, tin_price) VALUES (?, ?, ?, ?, ?, ?)');
    insertPrice.run('price-1', 'Sungold Sunflower Oil', 'sungold-sunflower', 155, 145, 7250);
    insertPrice.run('price-2', 'Safal Groundnut Oil', 'safal-groundnut', 190, 180, 9000);
    insertPrice.run('price-3', 'Safal Palmolein Oil', 'safal-palmolein', 110, 100, 5000);
    insertPrice.run('price-4', 'Safal Soyabean Oil', 'safal-soyabean', 140, 130, 6500);
    insertPrice.run('price-5', 'Safal Rice Bran Oil', 'safal-ricebran', 165, 155, 7750);
  }

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

    // Seed announcements
    const insertAnnouncement = db.prepare(`
      INSERT INTO announcements (id, title, content, type, target, created_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insertAnnouncement.run('ann-001', 'Sunflower Seed Procurement Notice 2026', 'KOF Chitradurga is procuring sunflower seeds for Kharif 2026 season. Farmers can bring their produce to the nearest OGCS or APMC yard. MSP: ₹7,721/quintal.', 'tender', 'public', 'admin-001', '2026-05-15');
    insertAnnouncement.run('ann-002', 'Monthly Team Meeting - May 2026', 'All employees are requested to attend the monthly team meeting on 25th May at 10:00 AM in the conference hall. Agenda: Q1 review and Q2 targets.', 'general', 'employees', 'admin-001', '2026-05-18');
    insertAnnouncement.run('ann-003', 'New Distributor Application Open', 'We are looking for distributors in Bellary and Hospet regions. Interested parties can apply with their business documents. Exclusive territory benefits available.', 'news', 'public', 'admin-001', '2026-05-10');
    insertAnnouncement.run('ann-004', 'Oil Packing Unit Maintenance - June 2026', 'The packing unit will undergo scheduled maintenance from June 5-7. All dispatches for that week should be planned accordingly.', 'urgent', 'employees', 'admin-001', '2026-05-19');
    insertAnnouncement.run('ann-005', 'Farmer Training Program - Haveri AATC', 'Free training program on improved oilseed varieties and best practices at AATC Haveri on June 15-16, 2026. Registration open for all OGCS members.', 'news', 'public', 'admin-001', '2026-05-12');

    // Seed attendance for current month (May 2026)
    const insertAttendance = db.prepare(`
      INSERT OR IGNORE INTO attendance (id, employee_id, date, check_in, check_out, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const emp of employees) {
      for (let day = 1; day <= 20; day++) {
        const dateStr = `2026-05-${String(day).padStart(2, '0')}`;
        const dayOfWeek = new Date(dateStr).getDay();
        if (dayOfWeek === 0) continue; // Skip Sundays
        
        const isPresent = Math.random() > 0.1;
        insertAttendance.run(
          `att-${emp.id}-${day}`,
          emp.id,
          dateStr,
          isPresent ? `09:${String(Math.floor(Math.random() * 30)).padStart(2, '0')}` : null,
          isPresent ? `18:${String(Math.floor(Math.random() * 30)).padStart(2, '0')}` : null,
          isPresent ? 'present' : 'absent'
        );
      }
    }

    // Seed notifications
    const insertNotification = db.prepare(`
      INSERT INTO notifications (id, user_id, title, message, type, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const emp of employees) {
      insertNotification.run(`notif-${emp.id}-1`, emp.id, 'Payslip Generated', 'Your payslip for May 2026 has been generated. Check your payslips section.', 'info', '2026-05-20');
      insertNotification.run(`notif-${emp.id}-2`, emp.id, 'Team Meeting Reminder', 'Monthly team meeting scheduled for May 25th at 10:00 AM.', 'reminder', '2026-05-18');
    }
  });

  transaction();
}



function initializeNewTables() {
  // Products table with full nutrition info
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      short_description TEXT,
      retail_price REAL DEFAULT 0,
      bulk_price REAL DEFAULT 0,
      tin_price REAL DEFAULT 0,
      sizes TEXT DEFAULT '[]',
      features TEXT DEFAULT '[]',
      images TEXT DEFAULT '[]',
      stock_status TEXT DEFAULT 'in_stock',
      weight TEXT,
      ingredients TEXT,
      shelf_life TEXT,
      packaging_type TEXT,
      certifications TEXT DEFAULT '[]',
      sku TEXT,
      manufacturer TEXT DEFAULT 'KOF Chitradurga',
      storage_instructions TEXT,
      usage_info TEXT,
      health_benefits TEXT DEFAULT '[]',
      nutrition_calories REAL DEFAULT 0,
      nutrition_total_fat REAL DEFAULT 0,
      nutrition_saturated_fat REAL DEFAULT 0,
      nutrition_trans_fat REAL DEFAULT 0,
      nutrition_cholesterol REAL DEFAULT 0,
      nutrition_sodium REAL DEFAULT 0,
      nutrition_carbohydrates REAL DEFAULT 0,
      nutrition_protein REAL DEFAULT 0,
      nutrition_vitamins TEXT DEFAULT '[]',
      nutrition_minerals TEXT DEFAULT '[]',
      sort_order INTEGER DEFAULT 0,
      is_featured INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT,
      location TEXT,
      content TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      avatar_url TEXT,
      product_id TEXT,
      published INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS faqs (
      id TEXT PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category TEXT DEFAULT 'general',
      sort_order INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS contact_submissions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Seed products if empty
  const productCount = (db.prepare('SELECT COUNT(*) as count FROM products').get() as any).count;
  if (productCount === 0) {
    seedProducts();
  }

  // Seed testimonials if empty
  const testimonialCount = (db.prepare('SELECT COUNT(*) as count FROM testimonials').get() as any).count;
  if (testimonialCount === 0) {
    seedTestimonials();
  }

  // Seed FAQs if empty
  const faqCount = (db.prepare('SELECT COUNT(*) as count FROM faqs').get() as any).count;
  if (faqCount === 0) {
    seedFaqs();
  }

  // Seed gallery if empty
  const galleryCount = (db.prepare('SELECT COUNT(*) as count FROM gallery').get() as any).count;
  if (galleryCount === 0) {
    seedGallery();
  }
}

function seedProducts() {
  const insert = db.prepare(`INSERT INTO products (id, name, slug, category, description, short_description, retail_price, bulk_price, tin_price, sizes, features, images, stock_status, weight, ingredients, shelf_life, packaging_type, certifications, sku, storage_instructions, usage_info, health_benefits, nutrition_calories, nutrition_total_fat, nutrition_saturated_fat, nutrition_trans_fat, nutrition_cholesterol, nutrition_sodium, nutrition_carbohydrates, nutrition_protein, nutrition_vitamins, nutrition_minerals, sort_order, is_featured) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);

  const products = [
    {
      id: 'prod-1', name: 'Sungold Refined Sunflower Oil', slug: 'sungold-sunflower-oil',
      category: 'Refined Oil',
      description: 'Our flagship AGMARK certified premium refined sunflower oil. Double filtered using state-of-the-art technology at our Chitradurga plant. Preferred by thousands of households across Karnataka for its light texture, neutral taste, and high reusability. Rich in Vitamin E and low in saturated fat, making it ideal for everyday cooking.',
      short_description: 'Premium AGMARK certified double-filtered sunflower oil for healthy daily cooking.',
      retail_price: 155, bulk_price: 145, tin_price: 7250,
      sizes: JSON.stringify(['500ml', '1L', '2L', '5L', '15L Tin']),
      features: JSON.stringify(['AGMARK Certified', 'Double Filtered', 'No Cholesterol', 'High Smoke Point', 'Reusable Quality', 'Light Texture']),
      images: JSON.stringify(['/products/sungold-sunflower-1.jpg', '/products/sungold-sunflower-2.jpg']),
      stock_status: 'in_stock', weight: '920g per litre',
      ingredients: '100% Refined Sunflower Oil (Helianthus annuus)',
      shelf_life: '12 months from date of packaging',
      packaging_type: 'Food-grade HDPE pouches and tin containers',
      certifications: JSON.stringify(['AGMARK', 'FSSAI', 'ISO 22000']),
      sku: 'KOF-SUN-001',
      storage_instructions: 'Store in a cool, dry place away from direct sunlight. Keep container tightly closed after use.',
      usage_info: 'Ideal for deep frying, sauteing, baking, and salad dressings. Can be reused 3-4 times for frying.',
      health_benefits: JSON.stringify(['Rich in Vitamin E antioxidant', 'Low in saturated fat', 'Supports heart health', 'Cholesterol free', 'Light and easily digestible', 'High smoke point for safe cooking']),
      nutrition_calories: 884, nutrition_total_fat: 100, nutrition_saturated_fat: 10.3,
      nutrition_trans_fat: 0, nutrition_cholesterol: 0, nutrition_sodium: 0,
      nutrition_carbohydrates: 0, nutrition_protein: 0,
      nutrition_vitamins: JSON.stringify([{name: 'Vitamin E', amount: '41.08mg', dv: '274%'}, {name: 'Vitamin K', amount: '5.4mcg', dv: '5%'}]),
      nutrition_minerals: JSON.stringify([{name: 'Phosphorus', amount: '0mg', dv: '0%'}]),
      sort_order: 1, is_featured: 1
    },
    {
      id: 'prod-2', name: 'Safal Groundnut Oil', slug: 'safal-groundnut-oil',
      category: 'Filtered Oil',
      description: 'Premium quality cold-pressed groundnut oil extracted from the finest oilseeds procured directly from cooperative societies. Known for its rich aroma and traditional taste that brings out authentic Indian flavors. Perfect for traditional Karnataka cuisine, sweets, and pickles.',
      short_description: 'Cold-pressed groundnut oil with rich aroma for authentic Indian cooking.',
      retail_price: 190, bulk_price: 180, tin_price: 9000,
      sizes: JSON.stringify(['500ml', '1L', '2L', '5L', '15L Tin']),
      features: JSON.stringify(['Cold Pressed', 'Farm Fresh', 'Rich Aroma', 'Traditional Taste', 'High Protein Residue', 'Natural Process']),
      images: JSON.stringify(['/products/safal-groundnut-1.jpg', '/products/safal-groundnut-2.jpg']),
      stock_status: 'in_stock', weight: '920g per litre',
      ingredients: '100% Filtered Groundnut Oil (Arachis hypogaea)',
      shelf_life: '9 months from date of packaging',
      packaging_type: 'Food-grade HDPE pouches and tin containers',
      certifications: JSON.stringify(['AGMARK', 'FSSAI']),
      sku: 'KOF-GND-001',
      storage_instructions: 'Store in a cool, dry place. May solidify in cold temperatures - warm gently to restore.',
      usage_info: 'Perfect for deep frying, traditional sweets, pickles, and everyday cooking. Adds authentic flavor to Indian dishes.',
      health_benefits: JSON.stringify(['Rich in monounsaturated fats', 'Contains resveratrol antioxidant', 'Good source of Vitamin E', 'Helps reduce bad cholesterol', 'Natural anti-inflammatory properties', 'Supports skin health']),
      nutrition_calories: 884, nutrition_total_fat: 100, nutrition_saturated_fat: 16.9,
      nutrition_trans_fat: 0, nutrition_cholesterol: 0, nutrition_sodium: 0,
      nutrition_carbohydrates: 0, nutrition_protein: 0,
      nutrition_vitamins: JSON.stringify([{name: 'Vitamin E', amount: '15.69mg', dv: '105%'}, {name: 'Vitamin B3', amount: '0.01mg', dv: '0%'}]),
      nutrition_minerals: JSON.stringify([{name: 'Iron', amount: '0.03mg', dv: '0%'}, {name: 'Zinc', amount: '0.01mg', dv: '0%'}]),
      sort_order: 2, is_featured: 1
    },
    {
      id: 'prod-3', name: 'Safal Palmolein Oil', slug: 'safal-palmolein-oil',
      category: 'Cooking Oil',
      description: 'High quality refined palmolein oil ideal for commercial cooking, deep frying, and bulk food preparation. Offers excellent value with a high smoke point and long frying life. Most economical choice for hotels, restaurants, and large-scale cooking.',
      short_description: 'Economical cooking oil with high smoke point, ideal for commercial use.',
      retail_price: 110, bulk_price: 100, tin_price: 5000,
      sizes: JSON.stringify(['1L', '2L', '5L', '15L Tin']),
      features: JSON.stringify(['High Smoke Point', 'Ideal for Frying', 'Economical', 'Bulk Available', 'Long Frying Life', 'Versatile Use']),
      images: JSON.stringify(['/products/safal-palmolein-1.jpg']),
      stock_status: 'in_stock', weight: '910g per litre',
      ingredients: '100% Refined Palmolein Oil (Elaeis guineensis)',
      shelf_life: '12 months from date of packaging',
      packaging_type: 'Food-grade HDPE pouches and tin containers',
      certifications: JSON.stringify(['FSSAI', 'AGMARK']),
      sku: 'KOF-PLM-001',
      storage_instructions: 'Store at room temperature. Avoid refrigeration as oil may solidify below 20°C.',
      usage_info: 'Best for deep frying, commercial cooking, bakery items, and food processing. Excellent for repeated frying.',
      health_benefits: JSON.stringify(['Rich in Vitamin A (beta-carotene)', 'Contains tocotrienols', 'Good for high-heat cooking', 'Balanced fatty acid profile', 'No trans fats']),
      nutrition_calories: 884, nutrition_total_fat: 100, nutrition_saturated_fat: 49.3,
      nutrition_trans_fat: 0, nutrition_cholesterol: 0, nutrition_sodium: 0,
      nutrition_carbohydrates: 0, nutrition_protein: 0,
      nutrition_vitamins: JSON.stringify([{name: 'Vitamin A', amount: '0.03mg', dv: '3%'}, {name: 'Vitamin E', amount: '15.94mg', dv: '106%'}]),
      nutrition_minerals: JSON.stringify([]),
      sort_order: 3, is_featured: 0
    },
    {
      id: 'prod-4', name: 'Safal Soyabean Oil', slug: 'safal-soyabean-oil',
      category: 'Refined Oil',
      description: 'Nutritious refined soyabean oil rich in omega-3 and omega-6 fatty acids. Perfect for health-conscious families looking for a balanced cooking oil. Light in texture with a neutral taste that does not overpower the flavor of your dishes.',
      short_description: 'Omega-3 rich soyabean oil for heart-healthy everyday cooking.',
      retail_price: 140, bulk_price: 130, tin_price: 6500,
      sizes: JSON.stringify(['1L', '2L', '5L', '15L Tin']),
      features: JSON.stringify(['Omega-3 Rich', 'Heart Healthy', 'Light Texture', 'Versatile', 'Balanced Nutrition', 'Neutral Taste']),
      images: JSON.stringify(['/products/safal-soyabean-1.jpg']),
      stock_status: 'in_stock', weight: '920g per litre',
      ingredients: '100% Refined Soyabean Oil (Glycine max)',
      shelf_life: '12 months from date of packaging',
      packaging_type: 'Food-grade HDPE pouches and tin containers',
      certifications: JSON.stringify(['AGMARK', 'FSSAI']),
      sku: 'KOF-SOY-001',
      storage_instructions: 'Store in a cool, dry place away from direct sunlight and strong odors.',
      usage_info: 'Suitable for all types of cooking - frying, sauteing, baking, and salad preparation.',
      health_benefits: JSON.stringify(['Rich in Omega-3 fatty acids', 'Contains Omega-6 for brain health', 'Good source of Vitamin E', 'Supports cardiovascular health', 'Low in saturated fat', 'Helps maintain cholesterol levels']),
      nutrition_calories: 884, nutrition_total_fat: 100, nutrition_saturated_fat: 15.6,
      nutrition_trans_fat: 0, nutrition_cholesterol: 0, nutrition_sodium: 0,
      nutrition_carbohydrates: 0, nutrition_protein: 0,
      nutrition_vitamins: JSON.stringify([{name: 'Vitamin E', amount: '8.18mg', dv: '55%'}, {name: 'Vitamin K', amount: '183.9mcg', dv: '153%'}]),
      nutrition_minerals: JSON.stringify([{name: 'Iron', amount: '0.05mg', dv: '0%'}]),
      sort_order: 4, is_featured: 1
    },
    {
      id: 'prod-5', name: 'Safal Rice Bran Oil', slug: 'safal-rice-bran-oil',
      category: 'Health Oil',
      description: 'Premium rice bran oil with naturally occurring Oryzanol - a powerful antioxidant unique to rice bran. Recommended by nutritionists for its balanced fatty acid composition and heart-protective properties. The healthiest choice for daily cooking.',
      short_description: 'Oryzanol-rich heart-healthy rice bran oil recommended by nutritionists.',
      retail_price: 165, bulk_price: 155, tin_price: 7750,
      sizes: JSON.stringify(['1L', '2L', '5L']),
      features: JSON.stringify(['Oryzanol Rich', 'Low Absorption', 'Heart Friendly', 'Light & Healthy', 'Antioxidant Rich', 'Doctor Recommended']),
      images: JSON.stringify(['/products/safal-ricebran-1.jpg']),
      stock_status: 'in_stock', weight: '916g per litre',
      ingredients: '100% Refined Rice Bran Oil (Oryza sativa)',
      shelf_life: '12 months from date of packaging',
      packaging_type: 'Food-grade HDPE pouches',
      certifications: JSON.stringify(['FSSAI', 'AGMARK']),
      sku: 'KOF-RBO-001',
      storage_instructions: 'Store in a cool, dry place. Keep away from heat sources and sunlight.',
      usage_info: 'Excellent for all cooking methods. Low oil absorption makes food crispy yet less oily. Great for health-conscious families.',
      health_benefits: JSON.stringify(['Contains Oryzanol antioxidant', 'Balances good and bad cholesterol', 'Low oil absorption in food', 'Rich in natural Vitamin E', 'Supports immune system', 'Anti-inflammatory properties']),
      nutrition_calories: 884, nutrition_total_fat: 100, nutrition_saturated_fat: 19.7,
      nutrition_trans_fat: 0, nutrition_cholesterol: 0, nutrition_sodium: 0,
      nutrition_carbohydrates: 0, nutrition_protein: 0,
      nutrition_vitamins: JSON.stringify([{name: 'Vitamin E', amount: '32.3mg', dv: '215%'}, {name: 'Vitamin K', amount: '24.7mcg', dv: '21%'}]),
      nutrition_minerals: JSON.stringify([{name: 'Iron', amount: '0.07mg', dv: '0%'}]),
      sort_order: 5, is_featured: 1
    },
    {
      id: 'prod-6', name: 'KOF De-oiled Cake (DOC)', slug: 'kof-deoiled-cake',
      category: 'By-product',
      description: 'High protein de-oiled cake produced as a by-product of our oil extraction process. An excellent and economical source of protein for cattle feed and organic farming applications. Available in bulk for dairy farmers and agricultural use.',
      short_description: 'High-protein cattle feed and organic farming supplement from oil extraction.',
      retail_price: 800, bulk_price: 750, tin_price: 1500,
      sizes: JSON.stringify(['25kg Bag', '50kg Bag']),
      features: JSON.stringify(['High Protein', 'Cattle Feed Grade', 'Organic Farming', 'Bulk Supply', 'Economical', 'Natural Product']),
      images: JSON.stringify(['/products/deoiled-cake-1.jpg']),
      stock_status: 'in_stock', weight: '25kg / 50kg bags',
      ingredients: 'De-oiled Groundnut Cake / De-oiled Sunflower Cake',
      shelf_life: '6 months from date of packaging',
      packaging_type: 'PP woven bags',
      certifications: JSON.stringify(['BIS Standard']),
      sku: 'KOF-DOC-001',
      storage_instructions: 'Store in dry, well-ventilated area. Keep away from moisture and pests.',
      usage_info: 'Mix with regular cattle feed at 20-30% ratio. Can also be used as organic fertilizer for crop fields.',
      health_benefits: JSON.stringify(['45-48% protein content', 'Essential amino acids for livestock', 'Improves milk yield in cattle', 'Natural organic fertilizer', 'Cost-effective protein source']),
      nutrition_calories: 340, nutrition_total_fat: 1.5, nutrition_saturated_fat: 0.3,
      nutrition_trans_fat: 0, nutrition_cholesterol: 0, nutrition_sodium: 20,
      nutrition_carbohydrates: 25, nutrition_protein: 48,
      nutrition_vitamins: JSON.stringify([]),
      nutrition_minerals: JSON.stringify([{name: 'Calcium', amount: '200mg', dv: '15%'}, {name: 'Phosphorus', amount: '650mg', dv: '52%'}, {name: 'Iron', amount: '15mg', dv: '83%'}]),
      sort_order: 6, is_featured: 0
    }
  ];

  const txn = db.transaction(() => {
    for (const p of products) {
      insert.run(p.id, p.name, p.slug, p.category, p.description, p.short_description,
        p.retail_price, p.bulk_price, p.tin_price, p.sizes, p.features, p.images,
        p.stock_status, p.weight, p.ingredients, p.shelf_life, p.packaging_type,
        p.certifications, p.sku, p.storage_instructions, p.usage_info, p.health_benefits,
        p.nutrition_calories, p.nutrition_total_fat, p.nutrition_saturated_fat,
        p.nutrition_trans_fat, p.nutrition_cholesterol, p.nutrition_sodium,
        p.nutrition_carbohydrates, p.nutrition_protein, p.nutrition_vitamins,
        p.nutrition_minerals, p.sort_order, p.is_featured);
    }
  });
  txn();
}

function seedTestimonials() {
  const insert = db.prepare('INSERT INTO testimonials (id, name, role, location, content, rating, product_id, sort_order) VALUES (?,?,?,?,?,?,?,?)');
  const txn = db.transaction(() => {
    insert.run('test-1', 'Ramesh Kumar', 'Hotel Owner', 'Chitradurga', 'We have been using Sungold Sunflower Oil for our restaurant for 3 years. The quality is consistently excellent and the bulk pricing makes it perfect for our business. Our customers love the taste of food cooked in KOF oil.', 5, 'prod-1', 1);
    insert.run('test-2', 'Lakshmi Devi', 'Homemaker', 'Davangere', 'Safal Groundnut Oil brings back the traditional cooking aroma that reminds me of my mother\'s kitchen. My family refuses to use any other brand now. The cold-pressed quality is unmatched.', 5, 'prod-2', 2);
    insert.run('test-3', 'Suresh Gowda', 'Farmer', 'Haveri', 'KOF gives the best MSP for our sunflower seeds. Timely payments and transparent weighing at the OGCS society. Very satisfied with the cooperative model - it truly benefits us farmers.', 5, null, 3);
    insert.run('test-4', 'Dr. Priya Sharma', 'Nutritionist', 'Shimoga', 'I recommend Safal Rice Bran Oil to all my patients. The Oryzanol content helps manage cholesterol naturally. KOF produces genuinely pure oil - I have verified their AGMARK certification personally.', 5, 'prod-5', 4);
    insert.run('test-5', 'Manjunath B', 'Distributor', 'Chitradurga', 'Being a KOF distributor for 5 years has been very rewarding. Great margins, strong brand recognition, and excellent support from the cooperative. The products practically sell themselves.', 5, null, 5);
    insert.run('test-6', 'Shanthamma R', 'Sweet Shop Owner', 'Davangere', 'For making traditional sweets and snacks, only Safal Groundnut Oil gives the right flavor and texture. We order 50L tins monthly and the quality has never disappointed us.', 5, 'prod-2', 6);
  });
  txn();
}

function seedFaqs() {
  const insert = db.prepare('INSERT INTO faqs (id, question, answer, category, sort_order) VALUES (?,?,?,?,?)');
  const txn = db.transaction(() => {
    insert.run('faq-1', 'What certifications do KOF oils have?', 'All KOF edible oils carry AGMARK certification from the Government of India, FSSAI license, and our packing unit follows ISO 22000 standards. We maintain the highest quality parameters with regular testing at our in-house laboratory.', 'quality', 1);
    insert.run('faq-2', 'How can I place an order?', 'You can order through WhatsApp at +91 6366975382, visit our nearest retail outlet, or contact our office directly. For bulk orders (50L+), special pricing is available. We deliver within a 50km radius of Chitradurga.', 'orders', 2);
    insert.run('faq-3', 'What is the minimum order for home delivery?', 'Minimum order for home delivery is 5 litres. Orders above ₹2,000 qualify for free delivery within Chitradurga district. For other districts (Davangere, Shimoga, Haveri), delivery charges may apply.', 'orders', 3);
    insert.run('faq-4', 'How can I become a KOF distributor?', 'To become a distributor, you need a minimum investment of ₹2-5 Lakhs, valid trade license, and storage space. We offer 20-25% margins with exclusive 50km territory. Contact us on WhatsApp or email for the application process.', 'business', 4);
    insert.run('faq-5', 'Are KOF oils adulterated?', 'Absolutely not. KOF is a government cooperative with strict quality controls. Every batch is tested at our in-house lab before packing. We carry AGMARK certification which requires regular government inspection. Our 40-year reputation stands on purity.', 'quality', 5);
    insert.run('faq-6', 'What is the shelf life of KOF oils?', 'Refined oils (Sunflower, Soyabean, Palmolein, Rice Bran) have a 12-month shelf life. Filtered Groundnut Oil has a 9-month shelf life. Always check the manufacturing date on the pack and store in cool, dry conditions.', 'products', 6);
    insert.run('faq-7', 'Do you supply to hotels and restaurants?', 'Yes! We have special HoReCa (Hotel/Restaurant/Catering) pricing for bulk orders. 15L tins and 50L containers are available. Many hotels across 4 districts trust KOF for their daily cooking oil needs.', 'business', 7);
    insert.run('faq-8', 'How is KOF different from other oil brands?', 'KOF is a farmer-owned cooperative, not a private company. We procure oilseeds directly from farmers at fair prices and process them in our own modern plant. No middlemen, no adulteration. Profits go back to farmer welfare programs.', 'general', 8);
  });
  txn();
}

function seedGallery() {
  const insert = db.prepare('INSERT INTO gallery (id, title, category, description, image_url, sort_order, published) VALUES (?,?,?,?,?,?,?)');
  const txn = db.transaction(() => {
    insert.run('gal-1', 'Modern Oil Packing Unit', 'Factory', 'State-of-the-art automated packing machines at our Chitradurga plant', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', 1, 1);
    insert.run('gal-2', 'Sunflower Seed Procurement', 'Products', 'Fresh sunflower seeds being procured from farmer cooperatives', 'https://images.unsplash.com/photo-1508747703725-719296a3f381?w=800&q=80', 2, 1);
    insert.run('gal-3', 'Quality Testing Laboratory', 'Factory', 'In-house quality lab ensuring AGMARK standards for every batch', 'https://images.unsplash.com/photo-1582719471384-894fbb16f4ab?w=800&q=80', 3, 1);
    insert.run('gal-4', 'Farmer Training Program', 'Events', 'Regular training sessions at AATC Haveri for oilseed farmers', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80', 4, 1);
    insert.run('gal-5', 'Distribution Fleet', 'Infrastructure', 'Our delivery fleet covering 4 districts within 50km radius', 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80', 5, 1);
    insert.run('gal-6', 'Warehouse Facility', 'Infrastructure', 'Modern storage facility for raw materials and finished products', 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80', 6, 1);
    insert.run('gal-7', 'Board Meeting 2026', 'Team', 'Annual board meeting discussing growth strategies', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80', 7, 1);
    insert.run('gal-8', 'Oil Extraction Plant', 'Factory', 'Solvent extraction plant processing sunflower and groundnut seeds', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80', 8, 1);
    insert.run('gal-9', 'Farmer at Sunflower Field', 'Events', 'Oilseed growers in our cooperative network', 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80', 9, 1);
    insert.run('gal-10', 'Product Display', 'Products', 'KOF branded product range on retail shelves', 'https://images.unsplash.com/photo-1606914469633-bd39206ea739?w=800&q=80', 10, 1);
    insert.run('gal-11', 'Cooking Oil Production', 'Factory', 'Oil refining and double filtration process', 'https://images.unsplash.com/photo-1474979266404-7f28f2e65084?w=800&q=80', 11, 1);
    insert.run('gal-12', 'Team Photo', 'Team', 'Our dedicated team of professionals', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80', 12, 1);
  });
  txn();
}
