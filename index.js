const express = require('express');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.set('views', './views');

//Dựng server
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  // console.log("Co nguoi ket noi: " + socket.id);

  socket.on('CLIENT-SEND-MAU', (data) => {
    // console.log(data);
    io.sockets.emit('SERVER-SEND-MAU', data);
  });

});

app.get('/', (req, res) => {
  res.render("trangchu");
});
  
server.listen(3000, () => {
  console.log('Server started');
});