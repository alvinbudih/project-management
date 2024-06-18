module.exports = function errorHandler(error, req, res, next) {
  let msg, status;

  switch (error.name) {
    case "NotFoundError":
      msg = error.message;
      status = 404;
      break;

    case "ValidationError":
      msg = error.message;
      status = 400;
      break;

    default:
      msg = "Internal Server Error";
      status = 500;
      break;
  }

  res.status(status).json({ msg });
}