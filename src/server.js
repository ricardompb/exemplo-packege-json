import express from 'express'
const app = express()
app.use(express.json())

const port = 3000

import cliente from './cliente/index.js'

app.use('/cliente', cliente)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})