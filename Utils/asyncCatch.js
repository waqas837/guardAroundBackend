module.exports = asyncCatch = (argFun) => {
  return (req, res, next) => {
    argFun(req, res).catch((err) => next(err));
  };
};
