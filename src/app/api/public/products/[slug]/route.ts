import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const db = getDb();
    const product = db.prepare(
      'SELECT * FROM products WHERE slug = ? AND published = 1'
    ).get(slug) as Record<string, unknown> | undefined;

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Parse JSON fields back into arrays/objects
    const jsonFields = [
      'sizes',
      'features',
      'images',
      'certifications',
      'health_benefits',
      'nutrition_vitamins',
      'nutrition_minerals',
    ];

    const parsed = { ...product };
    for (const field of jsonFields) {
      if (parsed[field] && typeof parsed[field] === 'string') {
        try {
          parsed[field] = JSON.parse(parsed[field] as string);
        } catch {
          parsed[field] = [];
        }
      }
    }

    return NextResponse.json({ product: parsed });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
