const jwt = require('jsonwebtoken');

const secret = 'myDog';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbCI6ImN1c3R1bWVyIiwiaWF0IjoxNzA3MzYzMDMzfQ.UJfOtpLOseBhlz-qKTIG3htZVIOIUp-FCLQtGqeHtnY';

const verifyToken = (token, secred) => {
  return jwt.verify(token, secred);
}

const payload = verifyToken(token, secret);

console.log(payload);
