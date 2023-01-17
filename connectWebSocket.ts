import { readFileSync } from 'node:fs';
import { WebSocket } from 'ws';
import config from './config.json';

const jwt = readFileSync('./token.txt', 'utf-8');
const cookie = readFileSync('./cookie.txt', 'utf-8');

const wssUrl = `wss://openfeed.5paisa.com/Feeds/api/chat?Value1=${jwt}|${config.CLIENT_ID}`;

const ws = new WebSocket(wssUrl, {
  headers: {
    cookie: cookie,
  },
});

ws.on('open', () => {
  console.log('Connected successfully to 5paisa Live Market!');
  const data = {
    Method: 'MarketDepthService',
    Operation: 'Subscribe',
    ClientCode: config.CLIENT_ID,
    // Add Data in array as needed
    // Scripcodes: https://images.5paisa.com/website/scripmaster-csv-format.csv
    MarketFeedData: [{ Exch: 'M', ExchType: 'D', ScripCode: 239259 }],
  };
  ws.send(JSON.stringify(data));
});

ws.on('message', (bufferData: any) => {
  let data = JSON.parse(Buffer.from(bufferData).toString());
  console.log(
    'First Buyer : ',
    data.Details[0].Price,
    'First Seller: ',
    data.Details.find((d: any) => d.BbBuySellFlag === 83).Price
  );
});

ws.on('error', (error: any) => {
  console.log('Error occurred while connecting to WebSocket Server : ', error);
});
