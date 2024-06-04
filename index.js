const express = require('express');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.set('views', './views');

//Dựng server
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Co nguoi ket noi: ' + socket.id);

  socket.on('disconnect', () => {
    console.log(socket.id + ' ngat ket noi');
  });

  socket.on('client-send-data', (data) => {
    console.log(socket.id + ' gui: ' + data);

    //truong hop 1:  1 client gui data len server, server nhan duoc data va gui lai cho tat ca client khac
    //sau khi nhan duoc tin hieu, server gui lai data
    io.sockets.emit('server-send-data', data);


    //truong hop 2: client gui data len server, server nhan duoc data va gui lai cho chinh client do
    socket.emit('server-send-data', data);

    //truong hop 3: client gui data len server, server nhan duoc data va gui lai cho tat ca client khac ngoai client do
    socket.broadcast.emit('server-send-data', data);

    //truong hop 4: client gui data len server, server nhan va gui lai cho nhung client co id la 1, 2, 3
    //moc id cua client la socket.id
    //chat rieng: io.to(socketId).emit('message', 'for your eyes only');
    // socket.to('1').emit('server-send-data', data);
  });
});

app.get('/', (req, res) => {
  res.render("trangchu");
});
  
server.listen(3000, () => {
  console.log('Server started');
});