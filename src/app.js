const express = require('express');
const router = require('./routes/index');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const sequelize = require('./config/database');

const Store = require('connect-session-sequelize')(session.Store)
const app = express();

app.set('port', process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const myStore = new Store({ db: sequelize })
app.use(session({
    secret: 'jnsldjkandljgsnd',
    store: myStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
})); 

require('./controllers/passport.controller'); 
myStore.sync();

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));
app.use('/', router);
app.get('*', (req, res) =>{
    res.json({message: "Not Found"});
});
module.exports = app;