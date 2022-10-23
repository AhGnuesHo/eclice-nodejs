const users = require("../data/users");
const admins = require("../data/admins");

const setUser = (type) => (req, res, next) => {
  const { userName } = req.query;
  if (type === "user") {
    req.user = users[userName];
  } else {
    req.user = admins[userName];
  }
  next();
};
module.exports = setUser;
