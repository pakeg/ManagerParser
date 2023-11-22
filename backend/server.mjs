import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

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
  `https://cmh7wy-${5174}.csb.app`,
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

app.get('/', (req, res) => {
  res.send('Accept');
});

app.post('/', function (req, res) {
  res.status(200).json({ id: 1 });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
