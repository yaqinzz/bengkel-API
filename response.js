export const response = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    result: data,
    message: message,
  })
}
