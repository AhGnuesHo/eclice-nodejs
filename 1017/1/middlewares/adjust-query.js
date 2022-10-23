module.exports = (req, res, next) => {
  req.query = Object.keys(req.query).reduce((ac, key) => {
    const [value] = req.query[key].split("?");
    return {
      ...ac,
      [key]: value,
    };
  }, {});

  next();
};
