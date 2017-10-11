var express = require("express");
var CareerController = (function () {
    function CareerController() {
    }
    CareerController.getRouter = function () {
        var router = express.Router();
        router.get('/', function (req, res, next) {
            res.redirect('/career/products');
        });
        router.get('/products', function (req, res, next) {
            CareerController.viewFilter(req, res, 'category/career/sub/products');
        });
        router.get('/downloads', function (req, res, next) {
            CareerController.viewFilter(req, res, 'category/career/sub/downloads');
        });
        router.get('/applications', function (req, res, next) {
            CareerController.viewFilter(req, res, 'category/career/sub/applications');
        });
        router.get('/projects', function (req, res, next) {
            CareerController.viewFilter(req, res, 'category/career/sub/projects');
        });
        router.get('/freeware', function (req, res, next) {
            CareerController.viewFilter(req, res, 'category/career/sub/freeware');
        });
        return router;
    };
    CareerController.viewFilter = function (req, res, view) {
        var pjaxVersion = req.app.locals.pjaxVersion;
        var isPjax = req.header('x-pjax');
        if (isPjax) {
            res.set('X-PJAX-Version', pjaxVersion);
            res.render(view);
        }
        else {
            res.render('category/career/index', { pjaxView: view });
        }
    };
    return CareerController;
})();
module.exports = CareerController.getRouter();
