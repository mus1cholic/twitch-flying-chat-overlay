const CONSTANTS = require('./consts');

const tmi = require('tmi.js');

const badWords = require("bad-words");
const express = require("express");

const badWordsFilter = new badWords();

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let data = {
  message: "default"
};

function determineEmoji(str) {
  // courtesy of https://medium.com/reactnative/emojis-in-javascript-f693d0eb79fb
  return CONSTANTS.EMOJI_MATCH_REGEX.test(str);
}

function determineLink(str) {
  // TODO: implement this
  return false;
}

function determineBotMessage(data) {
  // TODO: implement this
  return false;
}

function updateData(newData) {
  msg = newData.message;

  if (determineEmoji(msg)) return;
  if (determineLink(msg)) return;
  if (determineBotMessage(newData)) return;
  // TODO: parse bot messages

  data.message = badWordsFilter.clean(newData.message);
  console.log(data);
  io.emit('data', data);
}

server.listen(CONSTANTS.PORT, () => {
  console.log(`Server running on port ${CONSTANTS.PORT}`);
});

const client = new tmi.Client({
  connection: {
    reconnect: true
  },
  channels: [
    'kurumii_osu' // TODO: generalize this in config file
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