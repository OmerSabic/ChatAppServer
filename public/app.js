var socket = io('http://localhost:3000');
var id = socket.io.engine.id;

document.getElementById('form').addEventListener('submit', handleForm);




function handleForm(event) { 
    socket.emit('test');
}