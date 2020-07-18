const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {readFileSync} = require('fs')

const saltRounds = 10

function getPrivKey(){
    // const pathToKey = path.join(__dirname,'../utils/','id_rsa_priv.pem');
    // const PRIV_KEY = readFileSync(pathToKey, 'utf8');
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN   
    return ACCESS_TOKEN;
}
function getPubKey(){
    // const pathToKey = path.join(__dirname,'../utils/','id_rsa_pub.pem');
    // const PUB_KEY = readFileSync(pathToKey, 'utf8');
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    return ACCESS_TOKEN;
}

function generatePassword(password){
    return bcrypt.hashSync(password, saltRounds)
}

function comparePasswords(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword)
}

function issueJWT(user){
    const {id} = user

    const payload = {
        sub: id,
        iat: Date.now()
    }
    const priv_key = getPrivKey();
    // jwt.sign()
    // const singedToken = jwt.sign(payload, priv_key, {expiresIn: expiresIn, algorithm: 'RS256'})
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN)

    return {
        token: accessToken
    }
}

module.exports = {
    generatePassword, 
    comparePasswords,
    getPrivKey,
    getPubKey,
    issueJWT
}