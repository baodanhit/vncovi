var express = require('express');
var router = express.Router();
const homeController = require('../controllers/homeController');

const $ = require('jquery');

/* GET home page. */
router.get('/', homeController.index);

// handel error
router.get('/*', (req, res) => {
    res.status(404);
    res.render('404');
    res.end();
})
module.exports = router;
