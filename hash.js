import bcrypt from 'bcrypt';

const password = 'livre';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Mot de passe hashé :', hash);
});