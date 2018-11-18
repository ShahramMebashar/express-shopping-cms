var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var validator = require('express-validator');
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

//Express session
app.use(session({
    secret: ['pirbadin', 'shop', 'talavoock'],
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: new Date(Date.now() + 460000)
    }
}));

//Validator with messages
app.use(validator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('-'),
            root = namespace.shift(),
            formParam = root;
        while(namespace.length) {
            formParam += '['+ namespace.shift() +']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));

//Flash and messages
// app.use(require('connect-flash')());
app.use(require('express-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
})

if(app.get('env') === 'development') {
    app.use(logger('dev'));
} else {
    app.use(helmet());
}

app.engine('hbs', exphbs({
    defaultLayout: 'default',
    extname: 'hbs',
    helpers: {
    }
}));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'hbs');

//Routes
var pages = require('./routes/pages');
var admin = require('./routes/admin');

app.use('/pages', pages);
app.use('/admin/pages', admin);


//Server port and linstener
if(!module.parent) {
    app.listen(app.get('port'), () => {
        console.log(`Server started with ${app.get('env')} mode on ${app.get('port')}`);
    });
}

//Export app for testing and other stuff
module.exports = app;