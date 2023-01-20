import config from './config.json';

const marketUrl = `${config.BASE_URL}/MarketFeed`;

const requestList = [
  {
    Exch: 'N',
    ExchType: 'D',
    Symbol: 'BEL 25 Jan 2023',
    Expiry: '20230125',
    StrikePrice: '0',
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
    Count: 1,
    MarketFeedData: requestList,
    ClientLoginType: 0,
    LastRequestTime: `/Date(${0})/`,
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
  });

  if (res.ok) {
    const response = await res.json();
    console.log('Market Feed response : ', response.body.Data);
  } else {
    console.error('Some error occured : ', await res.text());
  }
} catch (error) {
  console.error('Some error occured : ', error);
}
