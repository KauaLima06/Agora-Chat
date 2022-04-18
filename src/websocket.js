const { io } = require('./http');

io.on('connection', socket => {
    console.log(socket.id)

    socket.on('selectRoom', room => {
       socket.join(room);
    });

    socket.on('sendMessage', data => {
        let { room } = data;

        io.to(room).emit('recivedMessage', data);
    });
});