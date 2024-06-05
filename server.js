const express = require('express');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.set('views', './views');

//Dựng server
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(3000, () => {
  console.log('Server started');
});

var mangUser = [];

io.on('connection', (socket) => {
  console.log("co nguoi ket noi" + socket.id);

  socket.on('client-send-Username', (data) => {
    if (mangUser.indexOf(data) >= 0) {
      socket.emit('server-send-dki-thatbai');
    } else {
      mangUser.push(data);
      socket.Username = data;
      socket.emit('server-send-dki-thanhcong', data);
      io.sockets.emit('server-send-danhsach', mangUser);
    }
  });

  socket.on('logout', () => {
    mangUser.splice(
      mangUser.indexOf(socket.Username), 1
    );
    socket.broadcast.emit('server-send-danhsach', mangUser);
  });

  socket.on('user-send-message', (data) => {
    io.sockets.emit('server-send-message', { un: socket.Username, nd: data });
  });
  
  socket.on('user-typing', () => {
    // console.log("toi dang go chu");
    var s = socket.Username + " is typing...";
    io.sockets.emit('server-send-typing', s);
  });

  socket.on('user-stop-typing', () => {
    // console.log("toi stop go chu");
    io.sockets.emit('server-send-stop-typing');
  });
});


app.get('/', (req, res) => {
  res.render('trangchu');
}
);
