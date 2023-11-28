const createNewItemCategory = async function ({ choosedElement, title }) {
  const req = await fetch(import.meta.env.VITE_URL + '/api/new-product', {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ choosedElement, title }),
  });

  return req;
};

export default createNewItemCategory;
