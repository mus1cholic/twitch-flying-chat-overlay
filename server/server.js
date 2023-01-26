const CONSTANTS = require("./consts");
const config = require("../config.json");

const tmi = require("tmi.js");
const badWords = require("bad-words");
const express = require("express");

const badWordsFilter = new badWords();

const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);

let data = {
  message: "default"
};

function determineEmoji(msg) {
  // courtesy of https://medium.com/reactnative/emojis-in-javascript-f693d0eb79fb
  return CONSTANTS.EMOJI_MATCH_REGEX.test(msg);
}

function determineLink(str) {
  // TODO: implement this
  return false;
}

function determineCommand(str) {
  return str == "" || str[0] == '!';
}

function determineBotMessage(user) {
  user = user.toLowerCase()

  return config.bots.includes(user);
}

function returnColor(ctx) {
  if (ctx.badges != null && "broadcaster" in ctx.badges) {
    return CONSTANTS.RED_COLOR;
  } else if (ctx.mod) {
    return CONSTANTS.GREEN_COLOR;
  } else if (ctx.vip) { // this is so weird, returns undefined but i guess it works in this case
    return CONSTANTS.PINK_COLOR;
  } else if (ctx.subscriber) {
    return CONSTANTS.PURPLE_COLOR;
  } else {
    return CONSTANTS.GRAY_COLOR;
  }
}

function updateData(newData) {
  user = newData.user;
  msg = newData.message;
  ctx = newData.context;

  // various checks
  if (determineEmoji(msg)) return;
  if (determineCommand(msg)) return;
  if (determineLink(msg)) return;
  if (determineBotMessage(user)) return;

  color = returnColor(ctx);

  data = {
    message: badWordsFilter.clean(msg),
    color: color
  }

  io.emit('data', data);
}

server.listen(CONSTANTS.PORT, () => {
  console.log(`Server running on port ${CONSTANTS.PORT}`);
});

const client = new tmi.Client({
  connection: {reconnect: true},
  channels: config.channels
});

client.connect();

client.on('message', async (channel, context, message) => {
  console.log(context);

  updateData({
    user: context.username,
    message: message,
    context: context
  });
});