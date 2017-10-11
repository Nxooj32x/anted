var express = require("express");
var config = require('config');
var MainController = (function () {
    function MainController() {
    }
    MainController.getRouter = function () {
        var router = express.Router();
        router.get('/', function (req, res, next) {
            var dbConfig = config.get('main.picture');
            res.render('main', { dbConfig: dbConfig });
        });
        return router;
    };
    return MainController;
})();
module.exports = MainController.getRouter();
