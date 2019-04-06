const io = require('./index').io

module.exports = function (socket) {
    console.log('socket id', socket.id)
    console.log(socket.io)
    socket.on("join_room", room => {
        console.log('room', room.id)
        socket.join(room.id);
        console.log('connected to room', room.id)
    });

    socket.on("SEND_MESSAGE", ({ room, message, user }) => {

        socket.in(room).emit("RECEIVE_MESSAGE", {
            message,
            user
        });
    });

    socket.on("RECEIVE_MESSAGE", ({ room, message, user }) => {
        socket.to(room).emit('SEND_MESSAGE', {
            message, user
        })
    })

    socket.on("typing", ({ room }) => {
        socket.to(room).emit("typing", "Someone is typing");
    });

    socket.on("stopped_tying", ({ room }) => {
        socket.to(room).emit("stopped_tying");
    });
}