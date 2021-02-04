const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const uuid = require("uuid");
const config = require('./config');
var CryptoJS = require("crypto-js");
require('ejs')

var app = express();

var http = require('http').createServer(app);

var io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var secret;

let db = new sqlite3.Database('chatAppDB', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to SQLite database.');
});

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users(id INT, name TEXT, password TEXT)');
    /*var stmt = db.prepare('INSERT INTO users VALUES (?, ?, ?)');

    for(var i = 0; i < 10; i++) {
        stmt.run(i, "Thing " + i, );
    }

    stmt.finalize()

    db.each('SELECT rowid AS id, name, password FROM users', (err, row) => {
        console.log(row.id + ": " + row.name + ": " + row.password);
    })*/
});

app.get('/', (req, res) => {
    res.status(200).send({ content: 'Server is up!' })
})

app.post('/close', (req,res) => {
    var auth = req.headers.authorization;
    if(auth === secret) {
        res.status(200).send({
            content: "Server closing."
        })
        db.close()
        server.close()
    }
    else if(!auth) {
        res.status(401).send({
            content: "No Authorization Header Found."
        })
    }
    else {
        res.status(403).send({
            content: "Authorization Header Incorrect!"
        })
    }
})

function init() {
    if(config.static_secret) {
        secret = config.secret;
    }
    else {
        secret = uuid.v4();
    }
    port = config.port;
}


// Server Events //

// event for when user connects to server //
io.on('connection', (socket) => {
    socket.on('connectedUser', name => {
        socket.broadcast.emit('connectedUser', name)
    })
    socket.on('chatMsg', data => {
        socket.emit('chatMsg', data);
    })
    socket.on('chatMsg', data => {
        socket.broadcast.emit('chatMsg', data)
        console.log('broadcasting message');
    })
    socket.on('test', () => {
        io.sockets.emit('test')
    })
    socket.on('disconnect')
});

var port;
init()
var server = http.listen(port, () => {
    
    console.log('\nServer started on port ' + port)
    console.log('\n==========================\nServer secret: ' + secret);
    console.log("DO NOT SHARE THE SERVER SECRET WITH ANYONE!\n==========================\n")
})