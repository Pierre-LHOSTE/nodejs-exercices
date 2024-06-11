const securePath = ["/account"];

export const redirectMiddleware = (req, res, next) => {
  if (securePath.includes(req.path) && !req.session.isLogged) {
    res.redirect("/");
    return;
  }
  next();
};
