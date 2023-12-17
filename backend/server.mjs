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
  `https://cmh7wy-${5173}.csb.app/`,
  `https://cmh7wy-${port}.csb.app`,
  `https://cmh7wy-${port}.csb.app/`,
];
const corsOptions = {
  origin: (origin, cb) => {
    if (whitelist.indexOf(origin) > -1 || !origin) {
      cb(null, true);
    } else {
      cb(new Error('Запрещено CORS'));
    }
  },
  credentials: true,
  methods: ['OPTIONS'],
};
app.use(cors(corsOptions));
app.use(helmet());

app.use(function (req, res, next) {
  if (
    typeof req.cookies.authorized === 'undefined' &&
    req.path != '/api/authorization'
  ) {
    res.status(401).json({
      path: '/authorization',
      msg: 'Not allowed',
      statusText: 'Unauthorized',
    });
  } else next();
});

// authorization
app.get('/api/authorization', async function (req, res) {
  if (typeof req.cookies.authorized !== 'undefined') {
    res.status(200).json({ authorized: req.cookies.authorized });
  } else res.status(200).json({ authorized: false });
});

app.post('/api/authorization', async function (req, res) {
  const user = await authorize(req.body);
  if (!user?.error) {
    if (user.redirect) {
      const options = {
        secure: true,
        httpOnly: false,
        sameSite: 'None',
        expires: +req.body.remember ? new Date(Date.now() + 60000) : 0,
      };
      res.cookie('authorized', user.cookie, options);
      res.status(201).json({ authorized: user.cookie });
    } else
      res.status(400).json({
        path: '/authorization',
        msg: 'Authorization failed',
        statusText: 'Credentials wrong',
      });
  } else res.status(500).send(user.error);
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
