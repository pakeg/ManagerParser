import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {
  authorize,
  createNewItemCategory,
  createNewProduct,
  getCategoriesProduct,
  createNewUser,
  updateUserData,
  getAllUser,
} from './actions.mjs';

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const whitelist = [
  `https://cmh7wy-${5173}.csb.app`,
  `https://cmh7wy-${port}.csb.app`,
];
// const corsOptions = {
//   origin: (origin, cb) => {
//     if (whitelist.indexOf(origin) > -1) {
//       cb(null, true);
//     } else {
//       cb(new Error(`Origin not allowed: ${origin}`));
//     }
//   },
// };
// app.use(cors());
// app.use(helmet());

app.use(function (req, res, next) {
  console.log('Time: %d', Date.now());
  console.log(req.cookies, 'req.cookies.authorization');
  console.log(res.cookies, 'res.cookies.authorization');
  next();
});

// authorization
app.post('/api/authorization', async function (req, res) {
  const user = await authorize(req.body);
  if (!user?.error) {
    if (user.redirect) {
      const options = {
        sameSite: 'None',
        expires: +req.body.remember ? new Date(Date.now() + 360000) : 0,
        maxAge: 360000, // 60sec
      };
      res.cookie('authorization', user.cookie, options);
    }
    res.status(201).send({ redirect: user.redirect });
  } else res.status(400).send(user.error);
});

//------------
// new product page
app.post('/api/new-category', async function (req, res) {
  const newItem = await createNewItemCategory(req.body);
  if (!newItem?.error) res.status(201).json(newItem);
  else res.status(400).send(newItem.error);
});

app.post('/api/new-product', async function (req, res) {
  const isNewProduct = await createNewProduct(req.body);
  if (!isNewProduct?.error) res.sendStatus(201);
  else res.status(400).send(isNewProduct.error);
});

app.post('/api/getcategories-product', async function (req, res) {
  const items = await getCategoriesProduct();
  if (items) res.status(201).json(items);
  else res.sendStatus(500);
});
//-----------------
// AdminPanel
app.post('/api/create-new-user', async function (req, res) {
  const user = await createNewUser(req.body);
  res.status(201).json(user);
});

app.post('/api/update-user', async function (req, res) {
  const updatedUser = await updateUserData(req.body);
  res.status(201).json(updatedUser);
});

app.post('/api/getall-user', async function (req, res) {
  const users = await getAllUser();
  res.status(201).json(users);
});
//---------------------

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
