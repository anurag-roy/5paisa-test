import { readFileSync } from 'fs';
import config from './config.json';
const token = readFileSync('./token.txt', 'utf-8');

const marketUrl = `${config.BASE_URL}/MarketDepth`;

const requestList = [
  {
    Exchange: 'N',
    ExchangeType: 'D',
    ScripCode: 93887,
  },
];

const marketPayLoad = {
  head: {
    appName: config.APP_NAME,
    appVer: '1.0.0',
    key: config.APP_USER_KEY,
    osName: 'WEB',
    requestCode: '5PMF',
    userId: config.APP_USER_ID,
    password: config.APP_PASSWORD,
  },
  body: {
    Count: 5,
    ClientCode: config.CLIENT_ID,
    Data: requestList,
  },
};

try {
  const res = await fetch(marketUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(marketPayLoad),
  });

  if (res.ok) {
    const response = await res.json();
    console.log('Market Depth response : ', response.body.Data);
  } else {
    console.error('Some error occured : ', await res.text());
  }
} catch (error) {
  console.error('Some error occured : ', error);
}
