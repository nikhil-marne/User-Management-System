export async function createSession(req, user) {
  req.session.user = user;
}

export async function checkAuth(req, res, next) {
  if (req.session.user?._id) {
    next();
  } else {
    res.status(401).render("Home");
  }
}
