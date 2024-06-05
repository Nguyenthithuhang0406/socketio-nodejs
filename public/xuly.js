const socket = io('http://localhost:3000');

socket.on('server-send-dki-thatbai', () => {
  alert('Username da ton tai');
});

socket.on('server-send-danhsach', (data) => {
  $("#boxContent").html("");
  data.forEach(function (i) {
    $("#boxContent").append("<div class='user'>" + i + "</div>");
  });
});

socket.on('server-send-dki-thanhcong', (data) => {
  $("#currentUser").html(data);
  $("#loginForm").hide(2000);
  $("#chatForm").show(1000);
});

socket.on('server-send-message', (data) => {
  $("#listMessages").append("<div class='ms'>" + data.un + ": " + data.nd + "</div>");
});

socket.on('server-send-typing', (data) => {
  $("#thongbao").html("<img width='20px' src='tenor.gif'> " + data);
});

socket.on('server-send-stop-typing', () => {
  $("#thongbao").html("");
});

$(document).ready(function () {
  $("#loginForm").show();
  $("#chatForm").hide();

  $("#txtMessage").focusin(function () {
    socket.emit('user-typing');
  });


  $("#txtMessage").focusout(function () {
    socket.emit('user-stop-typing');
  });

  // Bắt sự kiện click vào nút dang ky
  $("#btnRegister").click(function () {
    //client gui username len server
    socket.emit('client-send-Username', $("#txtUsername").val());
  });

  $("#btnLogout").click(function () {
    socket.emit('logout');
    $("#loginForm").show(2000);
    $("#chatForm").hide(1000);
  });

  $("#btnSendMessage").click(function () {
    socket.emit('user-send-message', $("#txtMessage").val());
  });


});