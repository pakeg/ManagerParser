import sql from './db.mjs';
import bcrypt from 'bcryptjs';

const authorize = async function ({ nickname, password }) {
  try {
    const [user] = await sql`select * from users where nickname = ${nickname}`;
    if (typeof user === 'undefined') {
      return { redirect: false };
    }

    const redirect = bcrypt.compareSync(password, user.password.trim());
    if (redirect) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.nickname + user.email, salt);
      return { redirect, cookie: hash };
    }
    return { redirect };
  } catch (e) {
    return { error: e?.detail ?? 'Something went wrong. Please, try later' };
  }
};

const createNewItemCategory = async function ({ choosedElement, title }) {
  try {
    const newItem = await sql`
    insert into ${sql(choosedElement)}
      (title)
    values
      (${title})
    returning id, title
  `;
    return newItem;
  } catch (e) {
    return { error: e.detail };
  }
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
  try {
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

      const shops = await sql`
      select
        id, link
      from shops
      where link in ${sql(urls.map((uri) => uri.link))}
    `;

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

      const shopsList = [...shops, ...newShop];
      const final = urls.map((uri) => {
        const shop = shopsList.find((shop) => shop.link == uri.link);
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
  } catch (e) {
    return { error: e.detail };
  }
};

const getCategoriesProduct = async function () {
  const data = await sql`
    select  id, title, 'categories' as source from categories
        union all
    select  id, title, 'manufactures' as source from manufactures
        union all
    select  id, title, 'projects' as source from projects
    `;

  const items = data.reduce((c, n) => {
    if (!Object.hasOwn(c, n.source)) c[n.source] = [];
    c[n.source].push({ id: n.id, title: n.title });
    return c;
  }, {});

  return items;
};

const createNewUser = async function ({
  nickname,
  name,
  surname,
  email,
  password,
}) {
  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);

  const newUser = await sql`
    insert into users
      (nickname, name, surname, email, password)
    values
      (${nickname}, ${name}, ${surname}, ${email}, ${password})
    returning id, nickname, name, surname, email, active_status
  `;
  return newUser;
};

const updateUserData = async function (user) {
  if (Object.hasOwn(user, 'password')) {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  }

  const columns = Object.keys(user).filter((item) => item != 'id');
  const updatedUser = await sql`
  update users set ${sql(user, columns)}
  where id = ${user.id}
  returning id, nickname, name, surname, email, active_status
`;

  return updatedUser;
};

const getAllUser = async function () {
  const users =
    await sql`select id, nickname, name, surname, email, active_status from users order by id`;

  return users;
};

export {
  authorize,
  createNewItemCategory,
  createNewProduct,
  getCategoriesProduct,
  createNewUser,
  updateUserData,
  getAllUser,
};
