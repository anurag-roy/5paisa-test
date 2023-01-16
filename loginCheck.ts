import { readFileSync, writeFileSync } from 'fs';
import config from './config.json';

const loginCheckUrl =
  'https://openfeed.5paisa.com/Feeds/api/UserActivity/LoginCheck';

const token = readFileSync('./token.txt', 'utf-8');

const loginCheckPayload = {
  head: {
    requestCode: '5PLoginCheck',
    key: config.APP_USER_KEY,
    appVer: '1.0.0',
    appName: config.APP_NAME,
    osName: 'WEB',
    LoginId: config.CLIENT_ID,
  },
  body: {
    RegistrationID: token,
  },
};

try {
  const res = await fetch(loginCheckUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginCheckPayload),
    credentials: 'include',
  });

  if (res.ok) {
    const cookie = res.headers.get('Set-Cookie');
    console.log('Login Check response : ', await res.json());
    if (cookie) {
      writeFileSync('cookie.txt', cookie, 'utf-8');
    }
  }
} catch (error) {
  console.error('Some error occured : ', error);
}
