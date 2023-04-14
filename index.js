const express = require('express')
const app = express()
const port = 3002

const frigoRoutes = require('./routes/Frigo');
app.use('/frigo', frigoRoutes);

const listRoutes = require('./routes/List');
app.use('/list', listRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.static('public'))
