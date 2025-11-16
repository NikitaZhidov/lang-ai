export async function getData(): Promise<{ message: string }> {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const data = await fetch(`${url}/api`, { cache: 'no-store' });
  const json = await data.json();

  return json;
}
