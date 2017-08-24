'use strict';
var router = require('express').Router();
var AV = require('leanengine');

router.get('/', function(req, res, next) {
    res.redirect('/career/products');
});


router.get('/products', function(req, res, next) {
    viewFilter(req, res,'category/career/sub/products');
});


router.get('/downloads', function(req, res, next) {
    viewFilter(req, res,'category/career/sub/downloads');
});

router.get('/applications', function(req, res, next) {
    viewFilter(req, res,'category/career/sub/applications');
});

router.get('/projects', function(req, res, next) {
    viewFilter(req, res,'category/career/sub/projects');
});

router.get('/freeware', function(req, res, next) {
    viewFilter(req, res,'category/career/sub/freeware');
});


function viewFilter(req,res,view){
    var pjaxVersion = req.app.locals.pjaxVersion;
    var isPjax = req.header('x-pjax');
    if(isPjax){
        res.set('X-PJAX-Version',pjaxVersion);
        res.render(view);
    }else{
        res.render('category/career/index',{pjaxView:view});
                  
    }
}

module.exports = router;
