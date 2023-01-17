import { readFileSync } from 'fs';
import config from './config.json';
const token = readFileSync('./token.txt', 'utf-8');

const date = new Date();
date.setDate(date.getDate() + 1);
const followingDay = date.getTime();

const placeOrderUrl = `${config.BASE_URL}/PlaceOrderRequest`;
const placeOrderpayload = {
  head: {
    appName: config.APP_NAME,
    appVer: '1.0.0',
    key: config.APP_USER_KEY,
    osName: 'WEB',
    requestCode: '5PPlaceOrdReq',
    userId: config.APP_USER_ID,
    password: config.APP_PASSWORD,
  },
  body: {
    ClientCode: config.CLIENT_ID,
    OrderFor: 'P',
    Exchange: 'N',
    ExchangeType: 'C',
    Price: 0.0,
    OrderID: 0,
    OrderType: 'BUY',
    Qty: 0,
    UniqueOrderID: '1',
    DisQty: 0,
    IsStopLossOrder: false,
    StopLossPrice: 0,
    IsIOCOrder: false,
    IsIntraday: false,
    IsAHOrder: 'N',
    ValidTillDate: `/Date(${followingDay})/`,
    AppSource: config.APP_SOURCE,
  },
};

try {
  const res = await fetch(placeOrderUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(placeOrderpayload),
    credentials: 'include',
  });

  if (res.ok) {
    const response = await res.json();
    console.log('Place order response : ', response);
  } else {
    console.error('Some error occured : ', res);
  }
} catch (error) {
  console.error('Some error occured : ', error);
}
