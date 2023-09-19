'use strict'
async function errorHandler(err, req, res, next) {
  let status = 500
  let message = "Internal Server Error"

  if(err.name === "SequelizeValidationError" ||
  err.name === "SequelizeConstraintsError" ) {
    status = 400
    message = err.errors[0].message
  } else if (err.name === "Not Found"){
    status = 404
    message = "Not Found"
  } else if (err.name === "Unauthenticated"){
    status = 401
    message = "Invalid Token"
  } else if (err.name === "Forbidden") {
    status = 403
    message = "Forbidden"
  } else if (err.name === 'null email'||err.name === 'null password'|| err.name === 'incorrect password'|| err.name ==='null user'){
    status = 401
    message = "Invalid Email or Password"
  } else if (err.name === "JsonWebTokenError"){
    status = 401
    message = "Invalid Token"
  } else if (err.name === "SequelizeUniqueConstraintError"){
    status = 400
    message = "Email must be unique"
  }

  await res.status(status).json({message})
}

module.exports = errorHandler