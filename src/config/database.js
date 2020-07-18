const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('interviewTest', 'root', '',{
//     host: 'localhost',
//     dialect: 'mysql'
// })

const sequelize = new Sequelize('heroku_3816315a6003c09', 'bfce332a648e8e', '99b2ea7c',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
})

//:@/?reconnect=true

module.exports = sequelize;