import express from 'express';
import http from 'http'
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server)

io.on('connection', socket => {
  console.log('New user connected');

  socket.username = "Anonymous";

  socket.on('change_username', (data) => {
    console.log(socket.username);
    socket.username = data.username;
    console.log(socket.username, data.username);
  })

  socket.on('new_message', (data) => {
    io.sockets.emit('new_message', { message: data.message, username: socket.username })
  })

  socket.on("typing", (data) => {
    socket.broadcast.emit('typing', { username: socket.username });
  })
})

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
})

server.listen(3000, () => {
  console.log("App is running on port 3000");
});