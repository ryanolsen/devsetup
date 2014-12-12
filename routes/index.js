
/*
 * GET home page.
 */
var fs = require('fs');

exports.index = function(req, res){
	res.render('index', { title: 'Express' });
};

exports.upload = function(req, res){
	 if(req.files.file && req.files.file.path) {
		console.log(req.files);
		fs.readFile(req.files.file.path, function(err, data) {
			var newPath = './public/images/uploads/' + req.files.file.name; // TODO: scrub name
			console.log('new path', newPath)
			fs.writeFile(newPath, data, function(err) {
				res.send('file upload success');
			})
		});
	} else {
		res.send('failed to upload file');
	}
};