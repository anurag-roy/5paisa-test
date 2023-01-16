import config from './config.json';

const marketUrl = `${config.BASE_URL}/MarketFeed`;

const requestList = [
  {
    Exch: 'N',
    ExchType: 'D',
    Symbol: 'FEDERALBNK 25 Jan 2023 CE 195.00',
    Expiry: '20230125',
    StrikePrice: '160',
    OptionType: 'XX',
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
    Count: config.CLIENT_ID,
    MarketFeedData: requestList,
    ClientLoginType: 0,
    LastRequestTime: `/Date(${new Date().getTime()})/`,
    RefreshRate: 'H',
  },
};

try {
  const res = await fetch(marketUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(marketPayLoad),
    credentials: 'include',
  });

  if (res.ok) {
    const response = await res.json();
    console.log('Market Feed response : ', response);
  } else {
    console.error('Some error occured : ', res.body);
  }
} catch (error) {
  console.error('Some error occured : ', error);
}
