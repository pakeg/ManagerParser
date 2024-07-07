import sql from "./db.mjs";
import bcrypt from "bcryptjs";
import exceljs from "exceljs";
import { createFolderIfNotExists, isValidUrl } from "./utils.mjs";

const authorize = async function ({ nickname, password }) {
  try {
    const [user] = await sql`select * from users where nickname = ${nickname}`;
    if (typeof user === "undefined") {
      return { redirect: false };
    }

    const redirect = bcrypt.compareSync(password, user.password.trim());
    if (redirect) {
      const salt = bcrypt.genSaltSync(10);
      let hash = user.password.trim();
      const len = hash.length;
      hash = hash.slice(0, len / 2) + user.role + hash.slice(len / 2);
      return { redirect, cookie: hash };
    }
    return { redirect };
  } catch (e) {
    return { error: e?.detail ?? "Something went wrong. Please, try later" };
  }
};

const createNewItemCategory = async function ({ choosedElement, title }) {
  try {
    const [project] = await sql`
    insert into ${sql(choosedElement)}
      (title)
    values
      (${title})
    returning id, title
  `;
    return { project, choosedElement, created: true };
  } catch (e) {
    return { error: e?.detail ?? "Something went wrong. Please, try later" };
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
      const urls = shopsUrl.split(",").map((url) => {
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
          "title",
          "link"
        )} returning id, link`;
      }

      const shopsList = [...shops, ...newShop];
      const final = urls.map((uri) => {
        const shop = shopsList.find((shop) => shop.link == uri.link);
        return { product_id: productId, shop_id: shop.id, link: uri.href };
      });

      await sql`insert into parsed_products ${sql(
        final,
        "product_id",
        "shop_id",
        "link"
      )}`;
    }
    return projectId;
  } catch (e) {
    return { error: e.detail };
  }
};

const getCategoriesProduct = async function () {
  const data = await sql`
    select  id, title, active_status,  'categories' as source from categories where active_status = '1'
        union all
    select  id, title, active_status, 'manufactures' as source from manufactures where active_status = '1'
        union all
    select  id, title, active_status, 'projects' as source from projects where active_status = '1'
    `;

  const items = data.reduce((c, n) => {
    if (!Object.hasOwn(c, n.source)) c[n.source] = [];
    c[n.source].push({
      id: n.id,
      title: n.title,
      active_status: n.active_status,
    });
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
  if (Object.hasOwn(user, "password")) {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  }

  const columns = Object.keys(user).filter((item) => item != "id");
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

  return { users };
};

const getAllProductsInformation = async function (page) {
  try {
    const limitRows = 10;
    const shops = await sql`select * from shops`;
    const products = await sql`select
    (select count(*) from products) as count_row,
    products.id,
    products_projects.project_id as project_id,
    parsed_products.id as parsed_id,
    categories.title as category,
    manufactures.title as manufacture,
    products.title,
    part_number,
    purchase,
    price,
    shops.title as shop,
    shops.id as shop_id,
    shops.active_status as shop_active_status,
    parsed_products.link as link,
    parsed_products.created_on as date,
    parsed_price
  from
    products
    left join categories on (categories.id = category_id)
    left join manufactures on (manufactures.id = manufacture_id)
    left join parsed_products on (parsed_products.product_id = products.id)
    left join products_projects on (products_projects.product_id = products.id)
    left join shops on (shops.id = parsed_products.shop_id)
    where products.id in (select id from products order by id limit ${limitRows} offset ${
      page * limitRows
    })
    order by products.id`;
    if (products.length == 0) {
      return {};
    }

    const groupProductsById = products.reduce((c, n) => {
      if (!Object.hasOwn(c, n.id)) {
        c[n.id] = { product: { ...n, shops_data: [], projects_id: [] } };
      }
      const findShopData = c[n.id].product.shops_data.find(
        (el) => el.id == n.parsed_id
      );
      if (!findShopData) {
        c[n.id].product.shops_data.push({
          id: n.parsed_id,
          product_id: n.id,
          shop: {
            id: n.shop_id,
            title: n.shop,
            active_status: n.shop_active_status,
          },
          product_price: n.price,
          date: n.date,
          link: n.link,
          parsed_price: n.parsed_price,
        });
      }
      c[n.id].product.projects_id = [
        ...new Set([...c[n.id].product.projects_id, n.project_id]),
      ];
      c[n.id].info = { count: 0, min: 0, max: 0 };

      delete c[n.id].product.project_id;
      delete c[n.id].product.parsed_id;
      delete c[n.id].product.shop;
      delete c[n.id].product.shop_id;
      delete c[n.id].product.shop_active_status;
      delete c[n.id].product.date;
      delete c[n.id].product.href;
      delete c[n.id].product.parsed_price;
      return c;
    }, {});

    const AddInfoProduct = await sql`select
    product_id,
    count(product_id),
    min(parsed_price),
    max(parsed_price)
  from
    parsed_products
    left join products on (parsed_products.product_id = products.id)
  where product_id in ${sql(Object.keys(groupProductsById))}
  group by
    product_id`;
    AddInfoProduct.forEach((info) => {
      groupProductsById[info.product_id].info = {
        count: +info.count ?? 0,
        min: +info.min ?? 0,
        max: +info.max ?? 0,
      };
    });

    const resultedProducts = Object.entries(groupProductsById).map(
      ([_, value]) => ({ ...value.product, ...value.info })
    );
    const pages = Math.ceil(products[0].count_row / limitRows);

    return { products: resultedProducts, shops, pages };
  } catch (e) {
    return { error: e?.detail ?? "Something went wrong. Please, try later" };
  }
};

const updatePrice = async function (data) {
  try {
    const { id, price } = data;
    const result =
      await sql`update products set price = ${price} where id = ${id} returning id, price`;
    return result;
  } catch (e) {
    return { error: e?.detail ?? "Something went wrong. Please, try later" };
  }
};

const addParseLink = async function (data) {
  try {
    const { shopUrl, colIndex, productId, shopId } = data;
    const [parsed_product] = await sql`
    insert into parsed_products
      ( product_id,
        shop_id,
        link)
    values
      (${productId}, ${shopId}, ${shopUrl}) returning created_on as date, link, parsed_price`;

    return { colIndex, productId, shopId, ...parsed_product };
  } catch (e) {
    return { error: e?.detail ?? "Something went wrong. Please, try later" };
  }
};

const addProductComment = async function (hash, data) {
  try {
    const role = hash.match("admin|user|manager")[0];
    const password = hash.replace(role, "");
    const [user] = await sql`select * from users where password = ${password}`;
    if (typeof user === "undefined") {
      return false;
    }

    data = { ...data, user_id: user.id };
    const [comment] = await sql`insert into comments ${sql(
      data,
      Object.keys(data)
    )} returning *`;

    return { comment, parsed_product_id: data.parsed_product_id };
  } catch (e) {
    return { error: e?.detail ?? "Something went wrong. Please, try later" };
  }
};

const getCommentsHistory = async function ({ id }) {
  try {
    const comments =
      await sql`select * from comments where parsed_product_id = ${id}`;

    return { id, comments };
  } catch (e) {
    return { error: e?.detail ?? "Something went wrong. Please, try later" };
  }
};

const changingShopFields = async function ({ shopsData, row }) {
  const rowAndTypesForUpdate = {
    active_status: "active_status",
    selector: "text",
    img_src: "varchar",
  };
  if (!Object.keys(rowAndTypesForUpdate).includes(row)) return;
  try {
    let result;
    if (!Array.isArray(shopsData)) {
      [result] = await sql`update shops set ${sql(row)} = ${
        shopsData[row]
      } where id = ${shopsData.id} returning id, ${sql(row)}`;
    } else {
      const shopsForUpdate = shopsData.map((el) => [el.id, el[row]]);
      result = await sql`
        update shops set ${sql(row)} = (update_data.${sql(row)})::${sql(
        rowAndTypesForUpdate[row]
      )}
        from (values ${sql(shopsForUpdate)}) as update_data(id, ${sql(row)})
        where shops.id = (update_data.id)::int
        returning shops.id, shops.${sql(row)}`;
    }
    return { result, row };
  } catch (e) {
    return { error: e?.detail ?? e };
  }
};

const updateItemCategory = async function ({
  choosedElement,
  title,
  id,
  index,
}) {
  try {
    const [project] = await sql`update ${sql(
      choosedElement
    )} set title = ${title} where id = ${id} returning id, title`;
    return { project, choosedElement, index };
  } catch (e) {
    return { error: e?.detail ?? "Something went wrong. Please, try later" };
  }
};

const deleteItemCategory = async function ({ choosedElement, id, index }) {
  try {
    const project = await sql`delete from ${sql(
      choosedElement
    )} where id = ${id} returning id`;
    return { choosedElement, index };
  } catch (e) {
    return { error: e?.detail ?? "Something went wrong. Please, try later" };
  }
};

const addProductsToProjects = async function ({ products_id, projects_id }) {
  try {
    let props = [];
    const newArr = products_id.map((el) => {
      const splitted = el.split(",");
      return [splitted[0], splitted.splice(1)];
    });
    for (let i = 0; i < newArr.length; i++) {
      for (let k = 0; k < projects_id.length; k++) {
        if (newArr[i][1].includes(`${projects_id[k].id}`)) continue;
        props.push([newArr[i][0], projects_id[k].id]);
      }
    }
    if (props.length > 0) {
      const relations =
        await sql`insert into products_projects (product_id, project_id) values ${sql(
          props
        )} returning product_id, project_id`;

      const groupByProductId = relations.reduce((acc, curr) => {
        if (!acc[curr.product_id]) {
          acc[curr.product_id] = [];
        }
        acc[curr.product_id].push(curr.project_id);
        return acc;
      }, {});
      return groupByProductId;
    }

    return true;
  } catch (e) {
    return { error: e?.detail ?? "Something went wrong. Please, try later" };
  }
};

const deleteProducts = async function (products_id) {
  try {
    await sql`delete from products where id in ${sql(products_id)}`;
    return products_id;
  } catch (e) {
    return { error: e?.detail ?? "Something went wrong. Please, try later" };
  }
};

const exportToExcel = async function (products_id) {
  try {
    const path = "./files";
    createFolderIfNotExists(path);
    const workbook = new exceljs.Workbook();
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet("Products");

    worksheet.columns = Object.keys(products_id[0]).map((key) => {
      const str = key.split("_").join(" ");
      const header = str.charAt(0).toUpperCase() + str.slice(1);
      return { header, key, width: 20 };
    });

    for (let row of products_id) {
      worksheet.addRow(row);
    }
    worksheet.getRow(1).font = { bold: true };

    const data = await workbook.xlsx.writeFile(`${path}/products.xlsx`);
    return `${path}/products.xlsx`;
  } catch (e) {
    return { error: e?.detail ?? "Something went wrong. Please, try later" };
  }
};

const addNewShop = async function ({ url }) {
  try {
    if (isValidUrl(url)) {
      const uri = new URL(url);
      const shop = {
        link: uri.origin,
        title: uri.hostname,
        href: uri.href,
      };

      const [oldShop] =
        await sql`select * from shops where link = ${shop.link}`;
      if (oldShop) return { msg: "Магазин уже существует" };

      const [newShop] = await sql`insert into shops ${sql(
        shop,
        "title",
        "link"
      )} returning id, title, active_status`;

      return newShop;
    }

    return { msg: "Некорректная ссылка" };
  } catch (e) {
    return { error: e?.detail ?? "Something went wrong. Please, try later" };
  }
};

const deleteShop = async function ({ id }) {
  try {
    const [deletedShopId] =
      await sql`delete from shops where id = ${id} returning id`;

    return { id: deletedShopId.id };
  } catch (e) {
    return { error: e?.detail ?? "Something went wrong. Please, try later" };
  }
};

const parsedProductsListByShopId = async function ({ id }) {
  try {
    const parsed_products =
      await sql`select parsed_products.*, title from parsed_products left join products on parsed_products.product_id = products.id where shop_id = ${id}`;

    return { shop_id: id, parsed_products };
  } catch (e) {
    return { error: e?.detail ?? "Something went wrong. Please, try later" };
  }
};

export {
  authorize,
  createNewItemCategory,
  createNewProduct,
  getCategoriesProduct,
  createNewUser,
  updateUserData,
  getAllUser,
  getAllProductsInformation,
  updatePrice,
  addParseLink,
  addProductComment,
  getCommentsHistory,
  changingShopFields,
  updateItemCategory,
  deleteItemCategory,
  addProductsToProjects,
  deleteProducts,
  exportToExcel,
  addNewShop,
  deleteShop,
  parsedProductsListByShopId,
};
