const bcrypt = require('bcrypt');

const saltRounds = 10;

function generatePassword(password){
    return bcrypt.hashSync(password, saltRounds);
}

function comparePasswords(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = {generatePassword, comparePasswords}