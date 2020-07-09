
function isAuth(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else {
        res.status(403).json({message: 'You are not authorized'});
    }
}

module.exports = {isAuth};