const bcrypt = require('bcrypt');

const myPassword = 'admin 123 .202';

const hashPassword = async () => {
  const hash = await bcrypt.hash(myPassword, 2);
  return hash;
}

hashPassword();
