function error500ServerError(error, req, res, next) {
  console.log(error);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}

module.exports = error500ServerError;
