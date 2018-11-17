var express = require('express');
var router  = express.Router();



router.get('/', function(req, res){
    res.render('home', {title: 'Title of Pages'});
    console.log(req.flash('test'))
});


module.exports = router;