import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = '4c7a9f2e1b8d6c5a3e2f1b9d7c4a8e3f';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://oxiventt.com';

const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body as { urls: string[] };

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'urls array is required' }, { status: 400 });
    }

    const host = new URL(BASE_URL).hostname;
    const keyLocation = `${BASE_URL}/${INDEXNOW_KEY}.txt`;

    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation,
      urlList: urls,
    };

    const results = await Promise.allSettled(
      INDEXNOW_ENDPOINTS.map((endpoint) =>
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload),
        })
      )
    );

    const responses = results.map((result, i) => ({
      endpoint: INDEXNOW_ENDPOINTS[i],
      success: result.status === 'fulfilled' && result.value.ok,
      status: result.status === 'fulfilled' ? result.value.status : 'error',
    }));

    return NextResponse.json({ submitted: urls.length, responses });
  } catch (error) {
    console.error('IndexNow error:', error);
    return NextResponse.json({ error: 'Failed to submit to IndexNow' }, { status: 500 });
  }
}
