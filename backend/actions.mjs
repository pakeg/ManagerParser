import sql from './db.mjs';

const createNewItemCategory = async function ({ choosedElement, title }) {
  const newItem = await sql`
    insert into ${sql(choosedElement)}
      (title)
    values
      (${title})
    returning id, title
  `;
  return newItem;
};

const createNewProduct = async function ({
  title,
  categories: category_id,
  manufactures: manufacture_id,
  projects: project_id,
  part_number,
  purchase_price: purchase,
  price,
  shopsUrl,
}) {
  const [{ id: productId }] = await sql`
    insert into products
      ( category_id,
        manufacture_id,
        title,
        part_number,
        purchase,	
        price)
    values
      (${category_id}, ${manufacture_id}, ${title}, ${part_number}, ${purchase}, ${price})
    returning id
  `;

  const [{ id: projectId }] = await sql`
    insert into products_projects
      ( product_id,
        project_id)
    values
      (${productId}, ${project_id})
    returning id
  `;

  if (shopsUrl.length > 0) {
    const urls = shopsUrl.split(',').map((url) => {
      const uri = new URL(url);
      return {
        link: uri.origin,
        title: uri.hostname,
        href: uri.href,
      };
    });
    console.log(urls, '--------urls----------');

    const shops = await sql`
      select
        id, link
      from shops
      where link in ${sql(urls.map((uri) => uri.link))}
    `;
    console.log(shops, '--------shops----------');
    let newShop = [];
    let notFoundedShops = [];
    if (shops.length < urls.length) {
      notFoundedShops = urls
        .filter((url) => {
          return shops.find((shop) => shop.link == url.link) ? false : true;
        })
        .sort((a, b) => {
          if (a.title > b.title) return 1;
          else if (a.title < b.title) return -1;
          return 0;
        })
        .reduce((c, n) => {
          if (!c.length) return [n];
          if (c[c.length - 1].link == n.link) return c;
          return [...c, n];
        }, []);
    }

    if (notFoundedShops.length > 0) {
      newShop = await sql`insert into shops ${sql(
        notFoundedShops,
        'title',
        'link'
      )} returning id, link`;
    }

    const final = urls.map((uri) => {
      const shop = [...shops, ...newShop].find((shop) => shop.link == uri.link);
      return { product_id: productId, shop_id: shop.id, link: uri.href };
    });

    await sql`insert into parsed_products ${sql(
      final,
      'product_id',
      'shop_id',
      'link'
    )}`;
  }
  return projectId;
};

export { createNewItemCategory, createNewProduct };
