//import * as line from '@line/bot-sdk';
import express from "express";
const app = express();

// Dev用のConfig
//const config = require("../.config.json");

//CHANNEL_SECRET channel secret
//CHANNEL_TOKEN アクセストークン

// const config: line.ClientConfig = {
//     channelAccessToken: process.env.CHANNEL_TOKEN!,
//     channelSecret: process.env.CHANNEL_SECRET!
// };

// const middlewareConfig : line.MiddlewareConfig = {
//     channelSecret : process.env.CHANNEL_SECRET!
// }

// const client = new line.Client(config);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

app.get('/', (req, res) => {
    res.send('hello world')
  })

// app.post('/callback', line.middleware(middlewareConfig), (req, res) => {
//     Promise
//     .all(req.body.events.map(handleEvent))
//     .then((result) => res.json(result));
// });

// function handleEvent(event:line.WebhookEvent) {
//     if (event.type !== 'message' || event.message.type !== 'text') {
//       return Promise.resolve(null);
//     }
  
//     return client.replyMessage(event.replyToken, {
//       type: 'text',
//       text: event.message.text
//     });
//   }

