const updateUser = async function (data) {
  const req = await fetch(import.meta.env.VITE_URL + '/api/update-user', {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });

  return req;
};

export default updateUser;
