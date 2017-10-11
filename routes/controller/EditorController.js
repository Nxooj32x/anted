var express = require('express');
var EditorController = (function () {
    function EditorController() {
    }
    EditorController.getRouter = function () {
        var router = express.Router();
        router.get('/', function (req, res, next) {
            res.render('category/editor/index');
        });
        return router;
    };
    return EditorController;
})();
module.exports = EditorController.getRouter();
