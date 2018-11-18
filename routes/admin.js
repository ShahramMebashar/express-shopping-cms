var express = require('express'); 
var router = express.Router();

router.get('/', function (req, res) {
     res.render('adminHome', { title: 'Admin panel', layout: 'admin'});
});


module.exports = router;