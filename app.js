var express = require('express');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var path = require('path');

//App init
var app = express();

//App views and settings
app.engine('hbs', exphbs({
    defaultLayout: 'default',
    extname: 'hbs'
}));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes
app.get('/', function (req, res) {
    res.render('home', {title: 'Shopping cms'})
})

//Server port and linstener
if(!module.parent) {
    app.listen(3000, () => {
        console.log(`Server started on 3000`);
    });
}

//Export app for testing and other stuff
module.exports = app;