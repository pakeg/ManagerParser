const createNewProduct = async function (data) {
  const req = await fetch(import.meta.env.VITE_URL + '/api/new-product', {
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

export default createNewProduct;
