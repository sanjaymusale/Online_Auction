import io from 'socket.io-client'

const socket = io("http://localhost:3001/");

function connect(cb) {
    
    socket.on('connect', () => {
        console.log('connected react')
        
    })
    socket.on("chat", message => {
       
        console.log(message);
       
        cb(message);
    });
}

export { connect };
