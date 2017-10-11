import * as express from 'express';

class EditorController{
    static getRouter(){
        let router = express.Router();
        router.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
            res.render('category/editor/index');
        });
        return router;
    }
}

export = EditorController.getRouter();