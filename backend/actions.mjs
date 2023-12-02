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
  // https://dragonwinch.com.ua/ua/lebedky/elektricheskaya-lebedka-dlya-kvadrotsikla-dwm-2000-st, https://130.com.ua/uk/product/lifter-winch-dragon-winch-dwm-2000-st-maverick-series, https://avtozvuk.ua/ua/dragon-winch-maverick-dwm-2000-st-12v/p58364
  // if (shopsUrl.length > 0) {
  //   const urls = shopsUrl.split(",").map((url) => new URL(url.trim()).origin);
  //   console.log(urls, "urls");

  //   const shops = await sql`
  //     select
  //       id, link
  //     from shops
  //     where link in ${sql(urls)}
  //   `;

  //   let newShop = [];
  //   let notFoundedUrls = [];
  //   if (shops.length > 0) {
  //     notFoundedUrls = urls.filter((url) => {
  //       shops.forEach((shop) => {
  //         if (shop.link == url) return false;
  //         return true;
  //       });
  //     });
  //   }

  //   if (notFoundedUrls.lenght > 0) {
  //     notFoundedUrls.map((url) => ({
  //       title: new URL(url).hostname,
  //       link: url,
  //     }));

  //     console.log(notFoundedUrls, "notFoundedUrls");
  //     newShop = await sql`insert into shops ${sql(
  //       notFoundedUrls,
  //     )} returning id, link`;
  //   }

  //   await sql`insert into parsed_products ${sql()}`;
  // }
  return projectId;
};

export { createNewItemCategory, createNewProduct };
