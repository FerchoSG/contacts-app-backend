const { Router } = require('express');
const passport = require('passport');
const { isAuth } = require('../services/session')

const router = Router();


router.post('/login', passport.authenticate('local', {successRedirect: '/protected', failureRedirect: '/failure'}));

router.get('/logout', (req, res)=>{
    req.logOut();
    res.status(200).json({message: 'You are logged out'});
})

router.get('/protected', isAuth, (req, res)=>{
    res.status(200).json({message: 'You are logged in'})
})
router.get('/failure', (req, res)=>{
    res.status(403).json({message: 'Invalid credentials'})
})

module.exports = router;