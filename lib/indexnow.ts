const INDEXNOW_KEY = '4c7a9f2e1b8d6c5a3e2f1b9d7c4a8e3f';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://oxiventt.com';

const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
];

export async function pingIndexNow(urls: string[]): Promise<void> {
  if (!urls.length) return;

  const host = new URL(BASE_URL).hostname;
  const keyLocation = `${BASE_URL}/${INDEXNOW_KEY}.txt`;

  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList: urls,
  };

  await Promise.allSettled(
    INDEXNOW_ENDPOINTS.map((endpoint) =>
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      })
    )
  );
}

export function productUrl(slug: string): string {
  return `${BASE_URL}/products/${slug}`;
}
