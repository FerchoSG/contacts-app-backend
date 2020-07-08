const app = require('./app');
const sequelize = require('./config/database');

app.listen(app.get('port'), ()=>{
    console.log(`server running on http://localhost:${app.get('port')}`)
});
