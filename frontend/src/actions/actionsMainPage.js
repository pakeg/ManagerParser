export const loaderGetAllInformation = async ({ request }) => {
  const req = await fetch(
    import.meta.env.VITE_URL + '/api/get-all-information',
    {
      method: 'POST',
      signal: request.signal,
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    }
  );

  if (req.status === 401) {
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

  const res = await req.json();
  return res;
};
