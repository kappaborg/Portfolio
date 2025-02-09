import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bounds = searchParams.get('bounds');

  if (!bounds) {
    return NextResponse.json({ error: 'Bounds parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://data-cloud.flightradar24.com/zones/fcgi/feed.js?${searchParams.toString()}`,
      {
        headers: {
          'Accept': 'application/json',
          'Origin': 'https://www.flightradar24.com',
          'Referer': 'https://www.flightradar24.com/'
        },
        next: { revalidate: 30 } // Cache for 30 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching flight data:', error);
    return NextResponse.json({ error: 'Failed to fetch flight data' }, { status: 500 });
  }
} 