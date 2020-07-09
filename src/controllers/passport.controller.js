const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../models/User');
const { comparePasswords } = require('../services/password.service')

const customFields = { 
    usernameField: "username",
    passwordField: "password"
}

function validationCallback(username, password, done){
    User.findOne({where :{username}})
        .then( async user =>{
            if(!user) return done(null, false);

            const isValidPassword = comparePasswords(password, user.password);

            if(isValidPassword){ 
                return done(null, user);
            } else {
                return done(null, false);
            }
        }).catch(error => done(error))
}

const strategy = new Strategy(customFields ,validationCallback);

passport.use(strategy);

passport.serializeUser((user, done) =>{ return done(null, user.id)});

passport.deserializeUser((userId, done) =>{
    User.findOne({where: {id: Number(userId)}})
        .then(user => done(null, user))
        .catch(error => done(error))
})
