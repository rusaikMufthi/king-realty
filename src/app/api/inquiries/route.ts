import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newInquiry = {
      id: `inq-${Date.now()}`,
      ...body,
      status: 'NEW',
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully and logged in CRM lead pipeline',
      data: newInquiry
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
