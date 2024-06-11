import express from "express";
import session from "express-session";
import path from "node:path";
import { redirectMiddleware } from "./middleware.js";
import router from "./route/index.js";

const server = express();
const port = 8000;

const __dirname = import.meta.dirname;
const staticPath = path.join(__dirname, "public");

server.use(
  session({
    isLogged: false,
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
server.use(express.static(staticPath));
server.use(express.urlencoded({ extended: false }));
server.use(redirectMiddleware);
server.use(express.json());
server.use(router);

server.get("*", (req, res) => {
  res.status(404).send(`
    <h1>Not found</h1>
    <div><a href="/">Home</a></div>
  `);
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
