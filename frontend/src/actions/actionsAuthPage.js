import { redirect } from 'react-router-dom';

export const actionSignIn = async ({ request }) => {
  const data = Object.fromEntries(await request.formData());

  const req = await fetch(import.meta.env.VITE_URL + '/api/authorization', {
    method: 'POST',
    signal: request.signal,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (req.status === 400) {
    const info = await req.json();
    throw new Response(JSON.stringify({ msg: info.msg, path: info.path }), {
      status: req.status,
      statusText: info.statusText,
      headers: {
        'Content-Type': 'application/json; utf-8',
      },
    });
  }

  if (!req.ok) {
    const error = await req.text();
    throw new Response(error, {
      status: req.status,
      statusText: 'error',
    });
  }

  const { authorized } = await req.json();
  if (authorized) {
    sessionStorage.setItem('authorized', authorized);
    return redirect('/');
  }
};
