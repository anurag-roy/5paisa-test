import config from './config.json';

const orderList = [
  {
    Exch: 'N',
    ExchType: 'C',
    ScripCode: 11111,
    RemoteOrderID: '5712977609111312242',
  },
];

const getOrderStatusUrl = `${config.BASE_URL}/OrderStatus`;
const getOrderStatusPayload = {
  head: {
    appName: config.APP_NAME,
    appVer: '1.0.0',
    key: config.APP_USER_KEY,
    osName: 'WEB',
    requestCode: '5POrdStatus',
    userId: config.APP_USER_ID,
    password: config.APP_PASSWORD,
  },
  body: {
    ClientCode: config.CLIENT_ID,
    OrdStatusReqList: orderList,
  },
};

try {
  const res = await fetch(getOrderStatusUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(getOrderStatusPayload),
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
