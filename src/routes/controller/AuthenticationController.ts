/// <reference path="../../typings/index.d.ts" />
import * as express from "express";
import * as AV  from "leanengine";

class AuthenticationController{
    static getRouter(){
        let router = express.Router();
        router.post('/login', function(req: express.Request, res: express.Response, next: express.NextFunction) {
            AV.User.logIn(req.body.username, req.body.password).then(function (loginedUser) {
                req.app.locals.loginedUser = loginedUser;
                req.session.loginedUser = loginedUser;
                if(req.session.lastreq != null){
                    let lastreq = req.session.lastreq;
                    req.session.lastreq = null;
                    res.redirect(lastreq);
                }else{

                    res.redirect('/main');
                }
            }, function (error) {
                res.render('index', { eMsg: "Verification failed" });
            });
        });

        router.get('/logout', function(req: express.Request, res: express.Response, next: express.NextFunction) {
            delete req.session.loginedUser;
            delete req.app.locals.loginedUser;
            return  res.redirect('/');
        });

        return router;
    }
}

export = AuthenticationController.getRouter();