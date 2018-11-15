var express = require('express');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var path = require('path');
var helmet = require('helmet');
var logger = require('morgan');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var config = require('./config/database');

//Database config and connection
mongoose.connect(config.database,{useNewUrlParser: true});
var db = mongoose.connection;
db.once('open', function() {
    console.log('database successfully connected!');
});
db.on('error', (error) => console.log(error));

//App init
var app = express();
app.set('port', process.env.PORT || 3000);

//App views and settings
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

if(app.get('env') === 'development') {
    app.use(logger('dev'));
} else {
    app.use(helmet());
}

app.engine('hbs', exphbs({
    defaultLayout: 'default',
    extname: 'hbs'
}));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'hbs');

//Routes
app.get('/', function (req, res) {
    res.render('home', {title: 'Shopping CMS'})
})

//Server port and linstener
if(!module.parent) {
    app.listen(app.get('port'), () => {
        console.log(`Server started with ${app.get('env')} mode on ${app.get('port')}`);
    });
}

//Export app for testing and other stuff
module.exports = app;