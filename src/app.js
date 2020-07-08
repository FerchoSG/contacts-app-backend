const express = require('express');
const router = require('./routes/index');
const morgan = require('morgan');

const app = express();

app.set('port', process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(morgan('dev'));
app.use('/', router);
app.get('*', (req, res) =>{
    res.json({message: "Not Found"});
});

module.exports = app;