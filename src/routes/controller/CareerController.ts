/// <reference path="../../typings/index.d.ts" />
import * as express from "express";
import * as AV  from "leanengine";

class CareerController{
    static getRouter(){
        let router = express.Router();

        router.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
            res.redirect('/career/products');
        });


        router.get('/products', function(req: express.Request, res: express.Response, next: express.NextFunction) {
            CareerController.viewFilter(req, res,'category/career/sub/products');
        });


        router.get('/downloads', function(req: express.Request, res: express.Response, next: express.NextFunction) {
            CareerController.viewFilter(req, res,'category/career/sub/downloads');
        });

        router.get('/applications', function(req: express.Request, res: express.Response, next: express.NextFunction) {
            CareerController.viewFilter(req, res,'category/career/sub/applications');
        });

        router.get('/projects', function(req: express.Request, res: express.Response, next: express.NextFunction) {
            CareerController.viewFilter(req, res,'category/career/sub/projects');
        });

        router.get('/freeware', function(req: express.Request, res: express.Response, next: express.NextFunction) {
            CareerController.viewFilter(req, res,'category/career/sub/freeware');
        });

        return router;
    }

    static viewFilter(req: express.Request, res: express.Response, view:string ){
        var pjaxVersion = req.app.locals.pjaxVersion;
        var isPjax = req.header('x-pjax');
        if(isPjax){
            res.set('X-PJAX-Version',pjaxVersion);
            res.render(view);
        }else{
            res.render('category/career/index',{pjaxView:view});

        }
    }
}

export = CareerController.getRouter();