/// <reference path="../../typings/index.d.ts" />
import * as express from "express";
import * as AV  from "leanengine";

class ImagewallController{
    static getRouter(){
        let router = express.Router();
        let ImageWall = AV.Object.extend('ImageWall');
        router.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
            let loginedUser = req.session.loginedUser;
            let userId = loginedUser.objectId;
            let query = new AV.Query(ImageWall);
            query.equalTo('userId', userId);

            query.find().then(function (results) {
                res.render('category/imagewall/index',{results:results});
            }, function (error) {

            });
        });

        router.post('/image',function(req: express.Request, res: express.Response, next: express.NextFunction){
            var loginedUser = req.session.loginedUser;
            var imageWall = new ImageWall();
            imageWall.set('key', req.body.key);
            imageWall.set('width', req.body.width);
            imageWall.set('height', req.body.height);
            imageWall.set('format', req.body.format);
            imageWall.set('sourceLink', req.body.sourceLink);
            imageWall.set('size', req.body.size);
            imageWall.set('userId', loginedUser.objectId);

            imageWall.save().then(function(imageWall) {
                res.send(imageWall);
            }).catch(next);
        });

        return router;
    }
}
export = ImagewallController.getRouter();