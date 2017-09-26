const express = require('express');
const session = require('express-session')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash')
const RegnumberRoutes = require('./registration');
const Models = require('./models')
const models = Models('mongodb://localhost/regNumber')


const regNumberRoutes = RegnumberRoutes(models);
const app = express();


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

 app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}));
app.use(flash());

// start Routes
app.get('/registration', regNumberRoutes.Index);
app.post('/registration', regNumberRoutes.add);
app.get('/registration', regNumberRoutes.findAll);
app.get('/registration', regNumberRoutes.fillter);



//start the server
app.set('port',(process.env.PORT || 3001) );

app.listen(app.get('port'), function(){
  console.log("Web app started on port: ", app.get('port'));
});
