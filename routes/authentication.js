'use strict';
var router = require('express').Router();
var AV = require('leanengine');

router.post('/login', function(req, res, next) {
    AV.User.logIn(req.body.username, req.body.password).then(function (loginedUser) {
        req.app.locals.loginedUser = loginedUser;
        req.session.loginedUser = loginedUser;
        if(req.session.lastreq != null){
            var lastreq = req.session.lastreq;
            req.session.lastreq = null;
            res.redirect(lastreq);
        }else{
            res.redirect('/main');
        }
    }, function (error) {
        res.render('index', { eMsg: "Verification failed" });
    });
});

router.get('/logout', function(req, res, next) {
    delete req.session.loginedUser;
    delete req.app.locals.loginedUser;
    return  res.redirect('/');
});
module.exports = router;
