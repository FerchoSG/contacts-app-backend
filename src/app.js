const express = require('express')
const router = require('./routes/')
const morgan = require('morgan')
const passport = require('passport')
const cors = require('cors')
require('dotenv').config();
const app = express();

require('./controllers/passport.controller')(passport)

app.set('port', process.env.PORT || 4000)
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(passport.initialize())

app.use(morgan('dev'))
app.use('/api/v1', router)
app.get('*', (req, res) =>{
    res.status(404).json({message: "Page Not Found"})
});

module.exports = app