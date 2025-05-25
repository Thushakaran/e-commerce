const express = require('express')
const app = express();
const errorMiddleware = require('./middlewares/error')
const cookiesParser = require('cookie-parser')

app.use(cookiesParser())
app.use(express.json())

const products = require('./routes/product')
const auth = require('./routes/auth')


app.use('/api/v1/', products)
app.use('/api/v1/', auth)

app.use(errorMiddleware)

module.exports = app;