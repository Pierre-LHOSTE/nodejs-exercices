import fs from "fs";
import path from "node:path";
import { body } from "../utils/body.js";

export const getProfile = (req, res) => {
  const cwd = process.cwd();
  const viewPath = path.join(cwd, "view");

  const nav = fs.readFileSync(path.join(viewPath, "nav.html"), {
    encoding: "utf8",
  });
  const profile = fs.readFileSync(path.join(viewPath, "profile.html"), {
    encoding: "utf8",
  });

  if (!req.session.isLogged) {
    const html = body(nav + "<p>Unauthorized</p>");
    res.status(403).send(html);
  }

  const html = body(nav + profile);
  res.status(200).send(html);
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
