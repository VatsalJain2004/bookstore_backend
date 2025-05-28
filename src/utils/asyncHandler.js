const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await Promise.resolve(requestHandler(req, res, next));
    }
    catch (error) {
      const statusCode = error.statusCode || 500;
      const errorMessage = error.errorMessage || "Internal Server Error";
      res.status(statusCode).json({
        succees: false,
        error: errorMessage
      });
    }
  };
}

export default asyncHandler