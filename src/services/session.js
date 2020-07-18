const User = require('../models/User')
const UserSevice = require('./user.service')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { comparePasswords, issueJWT } = require('./password.service')

function authenticate(req, res, next){
    User.findOne({where: {username: req.body.username}})
        .then( async user =>{
            if(!user){
                res.status(401).json({message: 'Invalid username'})
            }

            const isPasswordValid = comparePasswords(req.body.password, user.password);
            
            if(isPasswordValid){
                const userToReturn = {id: user.id, name: user.name, username: user.username, email: user.email}
                const tokenObj = issueJWT(user)
                res.status(200).json({user: userToReturn, token: tokenObj.token, expiresIn: tokenObj.expiresIn})
            }else {
                res.status(401).json({message: 'Invalid password'})
            }
        }).catch(err => {
            console.log(err)
            next(err)
        })
}

const isAuth = (req, res, next) =>{
    jwt.verify(req.headers['authorization'], process.env.ACCESS_TOKEN, (err, user)=>{
        if(err) return res.status(403).json({message: err})
    })
    next()
}

module.exports = {
    isAuth,
    authenticate
}