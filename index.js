const express = require('express')
const mongoose = require('./config/database')
const cors = require('cors')
let socket = require('socket.io')


const { usersRouter } = require('./app/controllers/users_controller')
const { productsRouter } = require('./app/controllers/products_controller')
const { categoriesRouter } = require('./app/controllers/categories_controller')
const { sessionsRouter } = require('./app/controllers/sessions_controller')
const { biddingRouter } = require('./app/controllers/Bidding_controller')

const app = express()
const port = process.env.PORT || 3001



const path = require('path')
app.use(express.static(path.join(__dirname, 'client/build')))


var server = app.listen(port, () => {
    console.log('listening to port', port)
})
app.use(express.json())
app.use('/public/uploads', express.static('public/uploads'));
app.use(cors())

app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/category', categoriesRouter)
app.use('/sessions', sessionsRouter)
app.use('/bidding', biddingRouter)





// app.get('/', (req, res) => {
//     res.send('Welcome')
// })



io = socket(server);
// io.origins('http://localhost:3000/')
//console.log('io',server)

io.on('connection', (socket) => {
    console.log('socket id', socket.id);

    socket.on("join_room", (data) => {
        //console.log('room', room.id)
        socket.join(data.id);
        socket.broadcast.in(data.id).emit("new_user", data.name + " has joined");
        io.to(`${socket.id}`).emit('ADMIN_MSG', 'Admin : Welcome to Bidding');

        console.log('connected to room', data.id)
    });



});
