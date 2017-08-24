'use strict';
var router = require('express').Router();
var AV = require('leanengine');
var ImageWall = AV.Object.extend('ImageWall');


router.get('/', function(req, res, next) {
	var loginedUser = req.session.loginedUser;
	var userId = loginedUser.objectId;
	var query = new AV.Query(ImageWall);
	query.equalTo('userId', userId);

	query.find().then(function (results) {
		res.render('category/imagewall/index',{results:results});
	 }, function (error) {

	 });
});

router.post('/image',function(req, res, next){
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

module.exports = router;
