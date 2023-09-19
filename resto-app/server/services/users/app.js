const express = require('express')
const cors = require('cors')

const User = require('./controllers/users')
const {connect} = require('./connect')
const errorHandler = require('../app/server/middlewares/errorHandlers')
const app = express()
const port = process.env.PORT || 4001
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/users', User.findAll)
app.post('/users', User.register)
app.get('/users/:id', User.findOne) 
app.delete('/users/:id', User.delete)

app.use(errorHandler)


connect().then(() => { 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
}) 