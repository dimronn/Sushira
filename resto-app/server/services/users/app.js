const express = require('express')
const cors = require('cors')

const User = require('./controllers/users')
const {connect} = require('./connect')
const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/users', User.findAll)
app.post('/users', User.register)
app.get('/users/:id', User.findOne)
app.delete('/users/:id', User.delete)


connect().then(() => { 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
})