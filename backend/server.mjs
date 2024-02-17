import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";

import {
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
} from "./actions.mjs";

const app = express();
const port = 3000;
const client_port = 5173;

app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
const whitelist = [
  `https://lc6p8r-${port}.csb.app`,
  `https://lc6p8r-${client_port}.csb.app`,
  "https://codesandbox.io",
  `http://localhost:${port}`,
  `http://localhost:${client_port}`,
];
const corsOptions = {
  origin: (origin, cb) => {
    if (whitelist.indexOf(origin) > -1 || !origin) {
      cb(null, true);
    } else {
      cb(new Error("Запрещено CORS"));
    }
  },
  credentials: true,
  methods: ["OPTIONS"],
};
app.use(cors(corsOptions));
app.use(helmet());

app.use(function (req, res, next) {
  if (
    typeof req.cookies.authorized === "undefined" &&
    req.path != "/api/authorization"
  ) {
    res.status(401).json({
      path: "/authorization",
      msg: "Not allowed",
      statusText: "Unauthorized",
    });
  } else next();
});

// authorization
app.get("/api/authorization", async function (req, res) {
  if (typeof req.cookies.authorized !== "undefined") {
    res.status(200).json({ authorized: req.cookies.authorized });
  } else res.status(200).json({ authorized: false });
});

app.post("/api/authorization", async function (req, res) {
  const user = await authorize(req.body);
  console.log(user, "user - after");
  if (!user?.error) {
    if (user.redirect) {
      const options = {
        secure: true,
        httpOnly: false,
        sameSite: "None",
        expires: +req.body.remember ? new Date(Date.now() + 60000) : 0,
      };
      res.cookie("authorized", user.cookie, options);
      res.status(201).json({ authorized: user.cookie });
    } else
      res.status(400).json({
        path: "/authorization",
        msg: "Authorization failed",
        statusText: "Credentials wrong",
      });
  } else res.status(500).send(user.error);
});

//------------
// new product page
app.post("/api/new-categoryitem", async function (req, res) {
  const newItem = await createNewItemCategory(req.body);
  if (!newItem?.error) res.status(201).json(newItem);
  else res.status(400).send(newItem.error);
});

app.post("/api/new-product", async function (req, res) {
  const isNewProduct = await createNewProduct(req.body);
  if (!isNewProduct?.error) res.status(201).json({ created: true });
  else res.status(400).send(isNewProduct.error);
});

app.post("/api/getcategories-product", async function (req, res) {
  const items = await getCategoriesProduct();
  if (items) res.status(201).json(items);
  else res.sendStatus(500);
});
//-----------------
// AdminPanel
app.post("/api/create-new-user", async function (req, res) {
  const user = await createNewUser(req.body);
  res.status(201).json(user);
});

app.post("/api/update-user", async function (req, res) {
  const updatedUser = await updateUserData(req.body);
  res.status(201).json(updatedUser);
});

app.post("/api/getall-user", async function (req, res) {
  const users = await getAllUser();
  res.status(201).json(users);
});
//---------------------
//------main page-----------
app.post("/api/get-all-information", async function (req, res) {
  const data = await getAllProductsInformation();
  if (!data?.error) {
    res.status(201).json(data);
  } else res.status(500).send(data.error);
});

app.post("/api/post-update-price", async function (req, res) {
  const data = await updatePrice(req.body);
  if (!data?.error) {
    res.status(201).json(data);
  } else res.status(500).send(data.error);
});

app.post("/api/post-add-parse-link", async function (req, res) {
  const data = await addParseLink(req.body);
  if (!data?.error) {
    res.status(201).json(data);
  } else res.status(500).send(data.error);
});
//---------------------

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
