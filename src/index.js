const app = require('./app');

app.listen(app.get('port'), ()=>{
    console.log(`server running on http://localhost:${app.get('port')}`)
});
