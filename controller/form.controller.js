import crypto from "crypto";
import fs from "node:fs";
import path from "node:path";
import { body } from "../utils/body.js";

export const getForm = (req, res) => {
  const cwd = process.cwd();
  const viewPath = path.join(cwd, "view");

  const form = fs.readFileSync(path.join(viewPath, "form.html"), {
    encoding: "utf8",
  });
  const nav = fs.readFileSync(path.join(viewPath, "nav.html"), {
    encoding: "utf8",
  });

  const html = body(nav + form);

  res.status(200).send(html);
};

export const submitForm = (req, res) => {
  const cwd = process.cwd();
  const viewPath = path.join(cwd, "view");
  const { username, password } = req.body;

  const nav = fs.readFileSync(path.join(viewPath, "nav.html"), {
    encoding: "utf8",
  });
  const form = fs.readFileSync(path.join(viewPath, "form.html"), {
    encoding: "utf8",
  });

  if (!username || !password) {
    const html = body(nav + "<p>Malformed request</p>" + form);
    res.status(403).send(html);
    return;
  }

  const users = JSON.parse(fs.readFileSync("data/users.json"));
  const user = users.find((user) => user.login === username);
  if (!user) {
    const html = body(nav + "<p>User not found</p>" + form);
    res.status(403).send(html);
    return;
  }

  const hashedPassword = crypto
    .createHash("sha1")
    .update(password)
    .digest("hex");
  if (hashedPassword !== user.password) {
    const html = body(nav + "<p>Invalid password</p>" + form);
    res.status(403).send(html);
    return;
  }

  req.session.isLogged = true;
  res.status(200).redirect("/account");
};
