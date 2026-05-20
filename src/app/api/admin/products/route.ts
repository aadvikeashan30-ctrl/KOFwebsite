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
    const products = db.prepare('SELECT * FROM products ORDER BY sort_order ASC, created_at DESC').all();
    return NextResponse.json({ products });
  } catch (error) {
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
    const {
      name, slug, category, description, short_description,
      retail_price, bulk_price, tin_price, sizes, features, images,
      stock_status, weight, ingredients, shelf_life, packaging_type,
      certifications, sku, manufacturer, storage_instructions,
      usage_info, health_benefits, nutrition_calories, nutrition_total_fat,
      nutrition_saturated_fat, nutrition_trans_fat, nutrition_cholesterol,
      nutrition_sodium, nutrition_carbohydrates, nutrition_protein,
      nutrition_vitamins, nutrition_minerals, sort_order, is_featured, published
    } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    const db = getDb();
    const id = uuid();
    db.prepare(`
      INSERT INTO products (
        id, name, slug, category, description, short_description,
        retail_price, bulk_price, tin_price, sizes, features, images,
        stock_status, weight, ingredients, shelf_life, packaging_type,
        certifications, sku, manufacturer, storage_instructions,
        usage_info, health_benefits, nutrition_calories, nutrition_total_fat,
        nutrition_saturated_fat, nutrition_trans_fat, nutrition_cholesterol,
        nutrition_sodium, nutrition_carbohydrates, nutrition_protein,
        nutrition_vitamins, nutrition_minerals, sort_order, is_featured,
        published, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, datetime('now'), datetime('now')
      )
    `).run(
      id, name, slug, category || null, description || null, short_description || null,
      retail_price || null, bulk_price || null, tin_price || null,
      sizes ? JSON.stringify(sizes) : null,
      features ? JSON.stringify(features) : null,
      images ? JSON.stringify(images) : null,
      stock_status || 'in_stock', weight || null, ingredients || null,
      shelf_life || null, packaging_type || null,
      certifications ? JSON.stringify(certifications) : null,
      sku || null, manufacturer || null, storage_instructions || null,
      usage_info || null,
      health_benefits ? JSON.stringify(health_benefits) : null,
      nutrition_calories || null, nutrition_total_fat || null,
      nutrition_saturated_fat || null, nutrition_trans_fat || null,
      nutrition_cholesterol || null, nutrition_sodium || null,
      nutrition_carbohydrates || null, nutrition_protein || null,
      nutrition_vitamins ? JSON.stringify(nutrition_vitamins) : null,
      nutrition_minerals ? JSON.stringify(nutrition_minerals) : null,
      sort_order || 0, is_featured || 0, published || 0
    );

    return NextResponse.json({ message: 'Product created', id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { id, ...fields } = body;

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const db = getDb();
    const jsonFields = ['sizes', 'features', 'images', 'certifications', 'health_benefits', 'nutrition_vitamins', 'nutrition_minerals'];
    const setClauses: string[] = [];
    const values: unknown[] = [];

    for (const [key, value] of Object.entries(fields)) {
      setClauses.push(`${key} = ?`);
      if (jsonFields.includes(key) && value && typeof value !== 'string') {
        values.push(JSON.stringify(value));
      } else {
        values.push(value);
      }
    }

    setClauses.push("updated_at = datetime('now')");
    values.push(id);

    db.prepare(`UPDATE products SET ${setClauses.join(', ')} WHERE id = ?`).run(...values);
    return NextResponse.json({ message: 'Product updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    const db = getDb();
    db.prepare('DELETE FROM products WHERE id = ?').run(id);
    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
