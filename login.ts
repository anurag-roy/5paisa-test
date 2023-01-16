import { writeFileSync } from 'node:fs';
import config from './config.json';
import { encrypt } from './encrypt.js';

const loginUrl = `${config.BASE_URL}/V4/LoginRequestMobileNewbyEmail`;

const loginPayload = {
  head: {
    appName: config.APP_NAME,
    appVer: '1.0.0',
    key: config.APP_USER_KEY,
    osName: 'WEB',
    requestCode: '5PLoginV4',
    userId: config.APP_USER_ID,
    password: config.APP_PASSWORD,
  },
  body: {
    Email_id: encrypt(config.APP_ENCRYPTION_KEY, config.CLIENT_EMAIL),
    Password: encrypt(config.APP_ENCRYPTION_KEY, config.CLIENT_PASSWORD),
    LocalIP: '192.168.1.1',
    PublicIP: '192.168.1.1',
    HDSerailNumber: '',
    MACAddress: '',
    MachineID: '039377',
    VersionNo: '1.7',
    RequestNo: '1',
    My2PIN: encrypt(config.APP_ENCRYPTION_KEY, config.CLIENT_DOB),
    ConnectionType: '1',
  },
};

try {
  const res = await fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginPayload),
    credentials: 'include',
  });

  if (res.ok) {
    const response = await res.json();
    console.log('Login response : ', response);
    if (response?.body?.JWTToken) {
      writeFileSync('token.txt', response.body.JWTToken, 'utf-8');
    }
  } else {
    console.error('Some error occured : ', res);
  }
} catch (error) {
  console.error('Some error occured : ', error);
}
