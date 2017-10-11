var Filter = (function () {
    function Filter() {
    }
    Filter.sessionFilter = function (req, res, next) {
        var loginUser = req.session.loginedUser;
        if (loginUser == undefined) {
            req.session.lastreq = req.originalUrl;
            res.render('index', { eMsg: "session expire" });
        }
        else {
            next();
        }
    };
    return Filter;
})();
module.exports = Filter;
