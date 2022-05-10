const { io } = require('./http');

io.on('connection', socket => {
    socket.on('teste', txt => console.log(txt))
    console.log(`New user connect: ${socket.id}`)

    socket.on('selectRoom', room => {
       socket.join(room);
    });

    socket.on('sendMessage', data => {
        let { room } = data;

        io.to(room).emit('recivedMessage', data);
    });
});