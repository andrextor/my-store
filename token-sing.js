const jwt = require('jsonwebtoken');

const secret = 'myDog';

const payload = {
  sub: 1,
  rol: 'custumer'
}

const sigToken = (payload, secret) => {
  return jwt.sign(payload, secret, {
    expiresIn: '15m'
  });
}

const token = sigToken(payload, secret);

console.log(token);
