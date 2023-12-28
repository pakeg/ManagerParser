export const fetchCategoriesItem = async (signal) => {
  const req = await fetch(
    import.meta.env.VITE_URL + "/api/getcategories-product",
    {
      method: "POST",
      signal,
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    },
  );

  if (!req.ok) {
    throw new Response("", {
      status: 500,
      statusText: "Server internal error",
    });
  }

  const res = await req.json(); //Object
  return res;
};

export const actionCreateNewProduct = async function (newProduct, signal) {
  const req = await fetch(import.meta.env.VITE_URL + "/api/new-product", {
    method: "POST",
    signal,
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    credentials: "include",
    body: JSON.stringify(newProduct),
  });

  if (!req.ok) {
    const error = await req.text();
    throw new Response(error, {
      status: req.status,
      statusText: "error",
    });
  }

  const res = await req.json(); //object
  return res;
};

export const actionCreateNewItemCategory = async function (details, signal) {
  const req = await fetch(import.meta.env.VITE_URL + "/api/new-categoryitem", {
    method: "POST",
    signal,
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    credentials: "include",
    body: JSON.stringify(details),
  });

  if (!req.ok) {
    const error = await req.text();
    throw new Response(error, {
      status: req.status,
      statusText: "error",
    });
  }

  const res = await req.json(); // object
  return res;
};
