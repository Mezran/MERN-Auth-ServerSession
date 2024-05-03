const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    process.env.NODE_ENV !== "test" ? console.log(error) : null;
    // console.log(error);
    return res.status(500).json({ message: "Server error", error });
  });
};

export default asyncHandler;
