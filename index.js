
const path = require('path');
const express = require('express');
const app = express();

// settings 
app.set('port', process.env.PORT || 3000);

// archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciamos el servidor
const server = app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});

const SocketIO = require('socket.io');
const io = SocketIO(server);

// Websockets
io.on('connection', (socket) => {
    console.log('nueva conexión', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
})

