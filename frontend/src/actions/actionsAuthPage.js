export const actionSignIn = async ({ request }) => {
  const data = Object.fromEntries(await request.formData());

  const req = await fetch(import.meta.env.VITE_URL + '/api/authorization', {
    method: 'POST',
    signal: request.signal,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });

  if (!req.ok) {
    const error = await req.text();
    throw new Response(error, {
      status: req.status,
      statusText: 'error',
    });
  }

  const { redirect } = await req.json();
  return redirect;
};
