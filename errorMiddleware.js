const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    console.log(error)
    res.send(error);
}
  module.exports = errorHandler;