"use strict";
/// <reference path="../../typings/index.d.ts" />
var express = require("express");
var AV = require("leanengine");
var AuthenticationController = (function () {
    function AuthenticationController() {
    }
    AuthenticationController.getRouter = function () {
        var router = express.Router();
        router.post('/login', function (req, res, next) {
            AV.User.logIn(req.body.username, req.body.password).then(function (loginedUser) {
                req.app.locals.loginedUser = loginedUser;
                req.session.loginedUser = loginedUser;
                if (req.session.lastreq != null) {
                    var lastreq = req.session.lastreq;
                    req.session.lastreq = null;
                    res.redirect(lastreq);
                }
                else {
                    res.redirect('/main');
                }
            }, function (error) {
                res.render('index', { eMsg: "Verification failed" });
            });
        });
        router.get('/logout', function (req, res, next) {
            delete req.session.loginedUser;
            delete req.app.locals.loginedUser;
            return res.redirect('/');
        });
        return router;
    };
    return AuthenticationController;
}());
module.exports = AuthenticationController.getRouter();
