import * as line from '@line/bot-sdk';
import express from "express";
import {UrlParse} from "./utils";
const app = express();
require('dotenv').config()

//CHANNEL_SECRET channel secret
//CHANNEL_TOKEN アクセストークン

const config: line.ClientConfig = {
    channelAccessToken: process.env.CHANNEL_TOKEN!,
    channelSecret: process.env.CHANNEL_SECRET!
};

const middlewareConfig : line.MiddlewareConfig = {
    channelSecret : process.env.CHANNEL_SECRET!
}

const client = new line.Client(config);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

app.get('/', (req, res) => {
    res.send('hello world')
  })

app.post('/callback', line.middleware(middlewareConfig), (req, res) => {
    Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

function handleEvent(event:line.WebhookEvent) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.resolve(null);
    }

    let returnMsg: string = "こちらがQR Codeです \n \n" + UrlParse(process.env.QR_SITE!, event.message.text)
  
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: returnMsg
    });
  }

