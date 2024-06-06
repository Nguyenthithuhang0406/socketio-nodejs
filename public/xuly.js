const socket = io('http://localhost:3000');

socket.on('server-send-rooms', (data) => {
  $("#dsRoom").html("");
  data.map(r => {
    $("#dsRoom").append("<h4 class='room'>" + r + "</h4>");
  });
});

socket.on('server-send-room-socket', (data) => {
  $("#roomHienTai").html(data);
});

socket.on('server-send-message', (data) => {
  $("#dsMessage").append("<h4>" + data + "</h4>");
});

$(document).ready(() => {
  $("#btnRoom").click(() => {
    socket.emit('client-create-room', $("#txtRoom").val());
  });

  $("#btnSend").click(() => {
    socket.emit('client-send-message', $("#txtMessage").val());
  });

});