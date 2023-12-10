export const loaderGetCategoriesItem = async ({ request }) => {
  const req = await fetch(
    import.meta.env.VITE_URL + '/api/getcategories-product',
    {
      method: 'POST',
      signal: request.signal,
      mode: 'cors',
      headers: {
        Accept: 'application/json',
      },
    }
  );

  if (!req.ok) {
    throw new Response('', {
      status: 500,
      statusText: 'Server internal error',
    });
  }

  const items = await req.json();
  return items;
};
