const socket = io();


let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

//? Emite
btn.addEventListener('click', function () {
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    });
});

message.addEventListener('keypress', function(){
    console.log(username.value)
    socket.emit('chat:typing', username.value);
});

//? Escucha
socket.on('chat:message', function (data){
    actions.innerHTML = '';
    output.innerHTML +=`<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`;
});

//? Escucha para el escribiendo
socket.on('chat:typing', function (data){
    actions.innerHTML = `<p><em>${data} está escribiendo...</em></p>`;
});