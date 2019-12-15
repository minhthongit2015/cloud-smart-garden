

module.exports = function CustomQueryParser(req, res, next) {
  if (!next) {
    next = res;
  }
  if (req.query.where) {
    req.query.where = JSON.parse(req.query.where);
  }
  next();
};
