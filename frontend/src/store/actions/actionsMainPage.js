export const actionAllInformation = async (page, signal) => {
  const req = await fetch(
    import.meta.env.VITE_URL + "/api/get-all-information/" + page,
    {
      method: "POST",
      signal,
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    }
  );

  if (req.status === 401) {
    const info = await req.json();
    throw new Response(JSON.stringify({ msg: info.msg, path: info.path }), {
      status: req.status,
      statusText: info.statusText,
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
  }

  if (!req.ok) {
    const error = await req.text();
    throw new Response(error, {
      status: req.status,
      statusText: "error",
    });
  }

  const res = await req.json();
  return res;
};

export const updatePrice = async (data, signal) => {
  const req = await fetch(import.meta.env.VITE_URL + "/api/post-update-price", {
    method: "POST",
    signal,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (req.status === 401) {
    const info = await req.json();
    throw new Response(JSON.stringify({ msg: info.msg, path: info.path }), {
      status: req.status,
      statusText: info.statusText,
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
  }

  if (!req.ok) {
    const error = await req.text();
    throw new Response(error, {
      status: req.status,
      statusText: "error",
    });
  }

  const [res] = await req.json();
  return res;
};

export const addParseLink = async (data, signal) => {
  const req = await fetch(
    import.meta.env.VITE_URL + "/api/post-add-parse-link",
    {
      method: "POST",
      signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  if (req.status === 401) {
    const info = await req.json();
    throw new Response(JSON.stringify({ msg: info.msg, path: info.path }), {
      status: req.status,
      statusText: info.statusText,
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
  }

  if (!req.ok) {
    const error = await req.text();
    throw new Response(error, {
      status: req.status,
      statusText: "error",
    });
  }

  const res = await req.json();
  return res;
};

export const addPostProductComment = async (data, signal) => {
  const req = await fetch(
    import.meta.env.VITE_URL + "/api/post-add-parse-product-comment",
    {
      method: "POST",
      signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  if (req.status === 401) {
    const info = await req.json();
    throw new Response(JSON.stringify({ msg: info.msg, path: info.path }), {
      status: req.status,
      statusText: info.statusText,
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
  }

  if (!req.ok) {
    const error = await req.text();
    throw new Response(error, {
      status: req.status,
      statusText: "error",
    });
  }

  const res = await req.json();
  return res;
};

export const getCommentsHistory = async (id, signal) => {
  const req = await fetch(
    import.meta.env.VITE_URL + "/api/get-comments-history",
    {
      method: "POST",
      signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include",
      body: JSON.stringify({ id }),
    }
  );

  if (req.status === 401) {
    const info = await req.json();
    throw new Response(JSON.stringify({ msg: info.msg, path: info.path }), {
      status: req.status,
      statusText: info.statusText,
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
  }

  if (!req.ok) {
    const error = await req.text();
    throw new Response(error, {
      status: req.status,
      statusText: "error",
    });
  }

  const res = await req.json();
  return res;
};

export const actionChangingShopFields = async (data, signal) => {
  const req = await fetch(
    import.meta.env.VITE_URL + "/api/post-changing-shop-fields",
    {
      method: "POST",
      signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  if (req.status === 401) {
    const info = await req.json();
    throw new Response(JSON.stringify({ msg: info.msg, path: info.path }), {
      status: req.status,
      statusText: info.statusText,
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
  }

  if (!req.ok) {
    const error = await req.text();
    throw new Response(error, {
      status: req.status,
      statusText: "error",
    });
  }

  const res = await req.json();
  return res;
};

export const actionAddProductsToProjects = async (data, signal) => {
  const req = await fetch(
    import.meta.env.VITE_URL + "/api/add-products-to-projects",
    {
      method: "POST",
      signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  if (req.status === 401) {
    const info = await req.json();
    throw new Response(JSON.stringify({ msg: info.msg, path: info.path }), {
      status: req.status,
      statusText: info.statusText,
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
  }

  if (!req.ok) {
    const error = await req.text();
    throw new Response(error, {
      status: req.status,
      statusText: "error",
    });
  }

  const res = await req.json();
  return res;
};

export const actionDeleteProducts = async (data, signal) => {
  const req = await fetch(import.meta.env.VITE_URL + "/api/delete-products", {
    method: "POST",
    signal,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (req.status === 401) {
    const info = await req.json();
    throw new Response(JSON.stringify({ msg: info.msg, path: info.path }), {
      status: req.status,
      statusText: info.statusText,
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
  }

  if (!req.ok) {
    const error = await req.text();
    throw new Response(error, {
      status: req.status,
      statusText: "error",
    });
  }

  const res = await req.json();
  return res;
};

export const actionExportToExcell = async (data, signal) => {
  const req = await fetch(import.meta.env.VITE_URL + "/api/export-to-excell", {
    method: "POST",
    signal,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json;charset=utf-8",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (req.status === 401) {
    const info = await req.json();
    throw new Response(JSON.stringify({ msg: info.msg, path: info.path }), {
      status: req.status,
      statusText: info.statusText,
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
  }

  if (!req.ok) {
    const error = await req.text();
    throw new Response(error, {
      status: req.status,
      statusText: "error",
    });
  }

  const blob = await req.blob();
  const url = window.URL.createObjectURL(blob);
  return url;
};

export const actionAddNewShop = async (data, signal) => {
  const req = await fetch(import.meta.env.VITE_URL + "/api/add-new-shop", {
    method: "POST",
    signal,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (req.status === 401) {
    const info = await req.json();
    throw new Response(JSON.stringify({ msg: info.msg, path: info.path }), {
      status: req.status,
      statusText: info.statusText,
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
  }

  if (!req.ok) {
    const error = await req.text();
    throw new Response(error, {
      status: req.status,
      statusText: "error",
    });
  }

  const res = await req.json();
  return res;
};

export const actionDeleteShop = async (data, signal) => {
  const req = await fetch(import.meta.env.VITE_URL + "/api/delete-shop", {
    method: "POST",
    signal,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (req.status === 401) {
    const info = await req.json();
    throw new Response(JSON.stringify({ msg: info.msg, path: info.path }), {
      status: req.status,
      statusText: info.statusText,
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
  }

  if (!req.ok) {
    const error = await req.text();
    throw new Response(error, {
      status: req.status,
      statusText: "error",
    });
  }

  const res = await req.json();
  return res;
};

export const actionParsedProductsListByShopId = async (id, signal) => {
  const req = await fetch(
    import.meta.env.VITE_URL + "/api/parsed-products-list-by-shop-id",
    {
      method: "POST",
      signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include",
      body: JSON.stringify({ id }),
    }
  );

  if (req.status === 401) {
    const info = await req.json();
    throw new Response(JSON.stringify({ msg: info.msg, path: info.path }), {
      status: req.status,
      statusText: info.statusText,
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
  }

  if (!req.ok) {
    const error = await req.text();
    throw new Response(error, {
      status: req.status,
      statusText: "error",
    });
  }

  const res = await req.json();
  return res;
};
