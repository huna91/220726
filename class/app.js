/*
웹소켓과 클라이언트가 양방향 통실할 수 있게 도와주는 소켓 io

*** socket.io ***
: 실시간 웹을 위한 자바스크립트 네트워킹 라이브러리 이다.
  웹 클라이언트와 서버간의 실시간 양방향 통신을 가능하게 해주는 node.js 모듈이다.
 - 가상화폐 거래소같은 데이터 전송이 많은 경우 빠르고 비용이 싼 표준 웹소켓을 사용하는 것이 좋다.
   (실제 업비트나 바이낸스 소켓 API를 사용하면 데이터가 매우 많이 들어온다.)
 - 비동기 이벤트 방식으로 실시간으로 간단하게 데이터를 요청하고 받을 수 있다.
 - ex) 웹의 고객센터 채팅같은 기능도 socket.io라이브러리를 사용해 페이지를 새로고침 하지 않아도 실시간으로 응답할 수 있다.
*** socket.io 메서드 ***
 - on : 이벤트에 매칭해서 소켓 이벤트 연결
 - emit : 소켓 이벤트 발생

 사용할 모듈
  - express  /  nodemon  /  fs  /  socket.io



*/

const express = require("express");
const fs = require("fs");
const socketio = require("socket.io");

// 서버의 몸체가 만들어짐
const app = express();

const PORT = 3002;

app.get("/", (req, res) => {
  fs.readFile("page.html", (err, data) => {
    res.end(data);
  });
});

//express 서버 활성화
const server = app.listen(PORT, () => {
  console.log(`${PORT}번 포트 사용중...`);
});

// 소켓 서버 생성 및 실행
// socketio(매개변수) : 매개변수는 express server를 넣어준다.
const io = socketio(server);

let userid = [];
let myid;
// socketio 연결
// connection -> 클라이언트가 웹소켓 서버에 접속할 때 발생

// on함수로 connection 이벤트에 매칭해서 소켓 이벤트 연결
io.sockets.on("connection", (socket) => {
  console.log("유저 접속");
  userid.push(socket.id);
  console.log(socket.id);
  console.log(userid);
  socket.on("hi", (data) => {
    console.log(myid, data, "에게 보냄 소켓 hi이벤트 실행");
    // 자기 자신한테 전송
    // socket.emit("hi", "웹소켓에서 클라이언트로 보냄");
    // 모든 대상에게 전송
    // io.sockets.emit("hi", "모두에게");
    // 자기 자신 제외 모든 대상(방송)
    // socket.broadcast.emit("hi", "나 뺴고 모두");
    // 비밀대화
    io.sockets.to(data.id).emit("hi", data.msg);
  });
});
