const express = require('express')
const mongoose = require('./config/database')
const cors = require('cors')
var socket = require('socket.io')


const { usersRouter } = require('./app/controllers/users_controller')
const { productsRouter } = require('./app/controllers/products_controller')
const { categoriesRouter } = require('./app/controllers/categories_controller')
const { sessionsRouter } = require('./app/controllers/sessions_controller')
const { biddingRouter } = require('./app/controllers/Bidding_controller')

const app = express()
const port = 3001

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





app.get('/', (req, res) => {
    res.send('Welcome')
})



io = socket(server);
io.origins('http://localhost:3000/')
io.on('connection', (socket) => {
    console.log('socket id', socket.id);

    // socket.on('SEND_MESSAGE', function (data) {
    //     io.emit('RECEIVE_MESSAGE', data);
    // // })
    // socket.on("SEND_MESSAGE", ({ room, message, user, firstName }) => {

    //     io.in(room).emit("RECEIVE_MESSAGE", {
    //         message,
    //         user,
    //         firstName,
    //     });
    // });

    socket.on("join_room", data => {
        //console.log('room', room.id)
        socket.join(data.id);
        socket.broadcast.in(data.id).emit("new_user", data.name + " has joined");
        console.log('connected to room', data.id)
    });

    socket.on('SET_TIME', (data) => {
        io.sockets.in(data.roomid).emit('GET_TIME', { time: data.time })
    })

    socket.on('CURRENT_TIME', (data) => {
        io.sockets.in(data.roomid).emit('CURRENT_TIME', { time: data.time })
    })

});


