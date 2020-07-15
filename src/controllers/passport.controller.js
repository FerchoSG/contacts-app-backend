const {Strategy, ExtractJwt} = require('passport-jwt')
const {getPubKey} = require('../services/password.service')
const User = require('../models/User')
const passport = require('passport')
const PUB_KEY = getPubKey()

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algotithms: ['RS256']
}

const strategy = new Strategy(options, (payload, done)=>{
    User.findOne({where: {id: payload.sub}})
        .then(user =>{
            if(user){
                return done(null, user)
            } else {
                return done(null, false)
            }
        }).catch(error => done(error, null))
})

module.exports = (passport) =>{
    passport.use(strategy)
}