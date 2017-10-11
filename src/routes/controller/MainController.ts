/// <reference path="../../typings/index.d.ts" />
import * as express from "express";
var config = require('config');

class MainController{
    static getRouter(){
        let router = express.Router();
        router.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
            var dbConfig = config.get('main.picture');
            res.render('main',{dbConfig:dbConfig});
        });

        return router;
    }
}
export = MainController.getRouter();