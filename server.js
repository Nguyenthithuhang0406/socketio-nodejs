const express = require('express');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3000, () => {
  console.log('Server started');
});

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('client-create-room', (data) => {
    socket.join(data);
    socket.phong = data;
    // console.log(socket.adapter.rooms);

    var mang=[];
    
    let rooms = socket.adapter.rooms;
    
    for (let [key, value] of rooms) {
      if (!value.has(key)) {
        mang.push(key);
      }
    }

    console.log(mang);
    io.sockets.emit('server-send-rooms', mang);
    socket.emit('server-send-room-socket', data);

  }); 

  socket.on('client-send-message', (data) => {
    io.sockets.in(socket.phong).emit('server-send-message', data);
  });

});

app.get("/", (req, res) => {
  res.render('trangchu');
});