// server/index.js

const express = require("express");
const tmi = require('tmi.js');
const PORT = process.env.PORT || 3001;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const badWords = require('bad-words')

const badWordsFilter = new badWords();

const updateData = (newData) => {
  data.message = badWordsFilter.clean(newData.message);
  io.emit('data', data);
}

let data = {
  message: "default"
};

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