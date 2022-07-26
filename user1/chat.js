const fs = require("fs");
const express = require("express");
const socketio = require("socket.io");

const app = express();

const PORT = 3005;

let server = app.listen(PORT, () => {
  console.log(`${PORT}번 포트 연결중..`);
});

const io = socketio(server);

app.get("/", (req, res) => {
  fs.readFile("chat.html", (err, data) => {
    res.end(data);
  });
});

io.sockets.on("connection", (socket) => {
  console.log("연결성공!");
  socket.on("message", (data) => {
    // console.log(data);
    // 클라이언트에서 socket.emit("message",data);
    // 위의 의미는 웹소켓에 연결되어있는 message 이벤트를 실행시켜준다.
    // socket.emit("message",data);
    io.sockets.emit("message", data);
  });
});

// 클라이언트가 종료했을때
io.sockets.on("disconnect", () => {
  console.log("연결실패!");
});
