const bcrypt = require('bcrypt');

const myPassword = 'admin 123 .202';

const verifyPassword = async () => {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$04$Q.uYOshPAI7GhaWqJVlV9ORGqR5c/dzISqurIC8Wq62H/PX0pEPPm';
  const compare = await bcrypt.compare(myPassword, hash);
  console.log(compare);

  return compare;
}

verifyPassword();
