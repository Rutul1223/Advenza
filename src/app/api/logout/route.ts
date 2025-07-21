import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Clear session or token (adjust based on your auth mechanism)
    // For example, if using cookies:
    const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    response.cookies.delete('session'); // Replace 'session' with your cookie name
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}