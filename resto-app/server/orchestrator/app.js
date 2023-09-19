const express = require('express')
const cors = require('cors')
const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

const app = express()
const port = process.env.PORT || 2000
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get("/users", async (req, res) => { 
  try {
    const usersCache = await redis.get('users')
    if (usersCache) {
      console.log('dariCache')
      const dataUsers = JSON.parse(usersCache)
     return  res.status(200).json(dataUsers)
    }
    const { data } = await axios.get('http://localhost:4001/users')
    console.log('dariaxios')
    const stringUsers = JSON.stringify(data)
    await redis.set("users", stringUsers)
    res.status(200).json(data)

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}) 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
