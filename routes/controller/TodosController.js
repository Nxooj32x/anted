var express = require("express");
var AV = require("leanengine");
var TodosController = (function () {
    function TodosController() {
    }
    TodosController.getRouter = function () {
        var router = express.Router();
        var Todo = AV.Object.extend('Todo');
        router.get('/', function (req, res, next) {
            var query = new AV.Query(Todo);
            query.descending('createdAt');
            query.find().then(function (results) {
                res.render('todos', {
                    title: 'TODO 列表',
                    todos: results
                });
            }, function (err) {
                if (err.code === 101) {
                    res.render('todos', {
                        title: 'TODO 列表',
                        todos: []
                    });
                }
                else {
                    next(err);
                }
            }).catch(next);
        });
        router.post('/', function (req, res, next) {
            var content = req.body.content;
            var todo = new Todo();
            todo.set('content', content);
            todo.save().then(function (todo) {
                res.redirect('/todos');
            }).catch(next);
        });
        return router;
    };
    return TodosController;
})();
module.exports = TodosController.getRouter();
