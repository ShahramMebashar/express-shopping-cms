var express = require('express');
var router  = express.Router();



router.get('/', function(req, res){
    req.flash('success', 'this is message from express-message');
    res.render('home', {title: 'Title of Pages'});
});


module.exports = router;