export const fetchAllInformation = async (signal) => {
  const req = await fetch(
    import.meta.env.VITE_URL + "/api/get-all-information",
    {
      method: "POST",
      signal,
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    },
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
