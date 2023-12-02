import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { createNewItemCategory, createNewProduct } from './actions.mjs';

const app = express();
const port = 3000;

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
const corsOptions = {
  origin: (origin, cb) => {
    if (whitelist.indexOf(origin) > -1) {
      cb(null, true);
    } else {
      cb(new Error(`Origin not allowed: ${origin}`));
    }
  },
};
app.use(cors(corsOptions));
app.use(helmet());

app.post('/api/new-category', async function (req, res) {
  const newItem = await createNewItemCategory(req.body);
  res.status(200).json(newItem);
});

app.post('/api/new-product', async function (req, res) {
  const isNewProduct = await createNewProduct(req.body);
  if (isNewProduct) res.sendStatus(201);
  else res.sendStatus(500);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
