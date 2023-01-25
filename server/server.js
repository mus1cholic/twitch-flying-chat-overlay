// server/index.js

const express = require("express");
const tmi = require('tmi.js');
const PORT = process.env.PORT || 3001;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Function to update the data
const updateData = (newData) => {
  data = newData;
  io.emit('data', data);
}

let data = {
  message: "default"
};

// io.on('connection', socket => {
//   socket.emit('data', data);
// });

// app.get('/api/data', (req, res) => {
//   res.json(data);
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const client = new tmi.Client({
  connection: {
    reconnect: true
  },
  channels: [
    'kurumii_osu'
  ]
});

client.connect();

client.on('message', async (channel, context, message) => {
  console.log('channel', {
    channel,
    user: context.username,
    message
  });

  updateData({ message: message });
});