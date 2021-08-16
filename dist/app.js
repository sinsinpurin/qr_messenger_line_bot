"use strict";
var line = require('@line/bot-sdk');
var express = require("express");
var app = express();
// Dev用のConfig
//const config = require("../.config.json");
//CHANNEL_SECRET channel secret
//CHANNEL_TOKEN アクセストークン
var config = {
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_TOKEN
};
var client = new line.Client(config);
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("listening on " + port);
});
app.post('/callback', line.middleware(config), function (req, res) {
    Promise
        .all(req.body.events.map(handleEvent))
        .then(function (result) { return res.json(result); });
});
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    });
}
