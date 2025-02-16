import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const profileUrl = searchParams.get('profileUrl');

  if (!profileUrl) {
    return NextResponse.json({ error: 'Profile URL is required' }, { status: 400 });
  }

  const apiKey = process.env.PROXYCURL_API_KEY;
  if (!apiKey) {
    console.error('ProxyCurl API key is not set');
    return NextResponse.json({ error: 'ProxyCurl API key not configured' }, { status: 500 });
  }

  try {
    // Set up the API URL for ProxyCurl
    const apiUrl = new URL('https://nubela.co/proxycurl/api/v2/linkedin');
    apiUrl.searchParams.append('linkedin_profile_url', profileUrl);
    apiUrl.searchParams.append('extra', 'include');

    // Make the request to ProxyCurl
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey, // Use the API key from the environment variable
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ProxyCurl API error: ${errorText}`);
    }

    const data = await response.json();

    // Output the raw data received from LinkedIn
    console.log('Raw LinkedIn Data:', data);

    return NextResponse.json(data); // Return the raw data
  } catch (error: unknown) {
    console.error('Error fetching LinkedIn data:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}