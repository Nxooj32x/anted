/// <reference path="../../typings/index.d.ts" />
import * as express from "express";
class Filter{
    static sessionFilter(req: express.Request, res: express.Response, next: express.NextFunction){
        let loginUser = req.session.loginedUser;
        if(loginUser == undefined){
            req.session.lastreq = req.originalUrl;
            res.render('index', { eMsg: "session expire" });
        }else{
            next();
        }
    }
}

export = Filter;