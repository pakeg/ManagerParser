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

export const actionCreateNewItemCategory = async function ({ request }) {
  const data = Object.fromEntries(await request.formData());

  const req = await fetch(import.meta.env.VITE_URL + '/api/new-category', {
    method: 'POST',
    signal: request.signal,
    mode: 'cors',
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

  const [res] = await req.json();
  return res;
};

export const actionCreateNewProduct = async function ({ request }) {
  const data = Object.fromEntries(await request.formData());

  const req = await fetch(import.meta.env.VITE_URL + '/api/new-product', {
    method: 'POST',
    signal: request.signal,
    mode: 'cors',
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

  return true;
};
