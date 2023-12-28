export const actionCreateNewUser = async function (data, signal) {
  const req = await fetch(import.meta.env.VITE_URL + "/api/create-new-user", {
    method: "POST",
    signal,
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!req.ok) {
    throw new Response("", {
      status: 500,
      statusText: "Server internal error",
    });
  }

  const [user] = await req.json();
  return user;
};

export const actionUpdateUser = async ({ data, action }, signal) => {
  if (action === "updateActiveStatus") {
    const status = [1, 0];
    data.active_status = status[data.active_status];
  }

  const req = await fetch(import.meta.env.VITE_URL + "/api/update-user", {
    method: "POST",
    signal,
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!req.ok) {
    throw new Response("", {
      status: 500,
      statusText: "Server internal error",
    });
  }

  const [user] = await req.json();
  return user;
};

export const fetchAllUsers = async (signal) => {
  const req = await fetch(import.meta.env.VITE_URL + "/api/getall-user", {
    method: "POST",
    signal,
    mode: "cors",
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
  });

  if (!req.ok) {
    throw new Response("", {
      status: 500,
      statusText: "Server internal error",
    });
  }
  const users = await req.json();
  return users;
};
