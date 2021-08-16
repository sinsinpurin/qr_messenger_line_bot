"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const line = __importStar(require("@line/bot-sdk"));
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const app = express_1.default();
require('dotenv').config();
//CHANNEL_SECRET channel secret
//CHANNEL_TOKEN アクセストークン
const config = {
    channelAccessToken: process.env.CHANNEL_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};
const middlewareConfig = {
    channelSecret: process.env.CHANNEL_SECRET
};
const client = new line.Client(config);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
app.get('/', (req, res) => {
    res.send('hello world');
    console.log(utils_1.UrlParse(process.env.QR_SITE, "アイウエオ"));
});
app.post('/callback', line.middleware(middlewareConfig), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }
    let returnMsg = "こちらがQR Codeです \n" + utils_1.UrlParse(process.env.QR_SITE, event.message.text);
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: returnMsg
    });
}
