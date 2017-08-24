'use strict';
var router = require('express').Router();
var AV = require('leanengine');
var config = require('config');

router.get('/', function(req, res, next) {
    var dbConfig = config.get('main.picture');
    res.render('main',{dbConfig:dbConfig});
});

module.exports = router;
