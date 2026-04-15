import { NextResponse } from 'next/server';

export async function POST() {
  const token = process.env.GITHUB_DEPLOY_TOKEN;

  if (!token) {
    return NextResponse.json({ error: 'Token não configurado no servidor.' }, { status: 500 });
  }

  const res = await fetch('https://api.github.com/repos/italo-dorea/locmaisba/dispatches', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event_type: 'update-sheets' }),
  });

  if (res.status === 204) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: `GitHub respondeu com ${res.status}` }, { status: res.status });
}
