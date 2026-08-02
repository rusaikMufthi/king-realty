import { NextResponse } from 'next/server';
import { INITIAL_PROPERTIES } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const district = searchParams.get('district');
  const type = searchParams.get('type');

  let results = [...INITIAL_PROPERTIES];

  if (district) {
    results = results.filter((p) => p.district.toLowerCase() === district.toLowerCase());
  }

  if (type) {
    results = results.filter((p) => p.propertyType === type);
  }

  return NextResponse.json({ success: true, count: results.length, data: results });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ success: true, message: 'Property created successfully', data: body });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }
}
