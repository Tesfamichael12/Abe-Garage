const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error(err.message, err.stack);

  res.status(statusCode).json({
    status: "error",
    statusCode: statusCode,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
