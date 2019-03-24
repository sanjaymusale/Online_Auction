const express = require('express')
const mongoose = require('./config/database')
const cors = require('cors')

const { usersRouter } = require('./app/controllers/users_controller')
const { productsRouter } = require('./app/controllers/products_controller')
const { categoriesRouter } = require('./app/controllers/categories_controller')

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/categories', categoriesRouter)






app.get('/', (req, res) => {
    res.send('Welcome')
})

app.listen(port, () => {
    console.log('listening to port', port)
})