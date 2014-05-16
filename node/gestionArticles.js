var util = require("util");
var fs = require("fs");
var db = require("./bdd_js.js");

var dirName = './article/';

/**
 * This function orders the operations to push an article in the db
 * @param b (JSON object) : article data = { title: 'title', author: 'author', content: 'content'}
 * @return (String) : "ok" or "ko"
 */
exports.submit_article = function (b) {
	//recreer un objet json avec (title, content) date en plus et action en moins
	var articleID = db.create_ID (b.author);
	push_article_db (articleID, b);
};
	
/**
 * This function sets content data of the json object required to be sent to View
 * @param //TODO
 * @return (String) : "ok" or "ko"
 */
 recreate_json_object = function (b) {
	/*title, author, content, date
	var _date,
		_author;
	
	
	/*sequence:
	1 check si utilisateur toujours connecte
	2 set date, set author
	3 build json object
	4 return json object
	//param: 
	_date = db.get_date ();
	//param: cookie
	_author = db.get_user ();
	
	//db.submit_article (articleID, author, obj, func_name);
	*/
};

/**
 * This function creates the article  environment and pushes content (images and videos if any | see later)
 * @param articleID (String): article identifier
 * @param b (JSON object): article data
 * @return (String): "ok" or "ko"
 */
push_article_db = function (articleID, b) {
	var dirPath = dirName + articleID;
	
	fs.exists(dirPath, function(exists) {
		if (!exists) {
			fs.mkdir(dirPath, function() {
				fs.mkdir(dirPath, function(error) {
					if (error && error.errno === 34) {
						fs.mkdirParent(path.dirname(dirPath), mode, callback);
						fs.mkdirParent(dirPath, mode, callback);
					}
				});
			});
			this.push_content (dirPath, articleID, b);
		} else {
			this.resp.write(JSON.stringify({resp: "folder already existing"}));//if the folder already exists, then do not stop the process
			this.resp.end();
		};
	});
	
	//this.push_content (dirPath, articleID, b);
};
	
/**
 * This function writes the content of the article in a text file
 * @param dirPath (String) : article directory path
 * @param articleID (String) : article identifier
 * @param b (JSON object) : article data
 * @return (String) : "ok" or "ko"
 */
push_content = function (dirPath, articleID, b) {
	//var articlePath = dirPath + '/' + articleID;
	//var data = '{title: ' + b.title + ', author: ' + b.author + ', content: ' + b.content + ', date: ' + b.date + '}';
	
	fs.exists(articlePath, function(exists) {
		if (!exists) {
			util.log ("file does not exist -> creation");
			fs.writeFile(articlePath, data, function(err) {
				if(err) {
					this.resp.write(JSON.stringify({resp: "error uploading file"}));
					this.resp.end();
				} else {
					this.resp.write(JSON.stringify({resp: "ok"}));
					this.resp.end();
				}
			});
		} else {
			this.resp.write(JSON.stringify({resp: "file already existing"}));
			this.resp.end();
		}
	});
};
	
/**
 * This function loads every article of which ids in param
 * @param dirPath (Array): array of article ids
 * @return (array of JSON objects): articles = [{title: 'title1', author: 'author1', date: 'date1', content: 'content1'}, {title: 'title2', author: 'author2', date: 'date2', content: 'content2'}, ...]
 */
load_articles = function (dirName, b) {//deleted the 'exports.'
	articleIdArray = db.order_article (b.articleStatus, obj, func_name);//ERRRRRRROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR! ARTICLE STATUS || last addition b.articleStatus
	var returnedArticles = new Array ();
	
	if (!articleIdArray) {
		this.resp.write(JSON.stringify({resp: "articles array transmission failed"}));
		this.resp.end();
	} else {
		var i = 0;//delete
		for (id in articleIdArray) {
			var articlePath = dirName + articleIdArray [i] + '/' + articleIdArray [i];
			fs.readFile(articlePath, function (err, data) {
				if (err) {
					this.resp.write(JSON.stringify({resp: "ko"}));
					this.resp.end();
				} else {
					returnedArticles.push(data);
				}
			});
			i ++;//delete
		};
		//rebuild json object? w/ date added
		this.resp.write(JSON.stringify(returnedArticles));
		this.resp.end();
	}
};

/**
 * This function deletes an article which id is given in parameter
 * @param articleId (Int): article id
 * @return (String): "ok" or "ko"
 */
delete_article = function (articleId) {
	var articlePath = dirPath + articleId;//think about destroying the whole directory and its gatherings recursively
	fs.exists(articlePath, function(exists) {
		if (!exists) {
			this.resp.write(JSON.stringify({resp: "did not exist"}));//big problem upcoming
			this.resp.end();
		} else {
			fs.unlink('/tmp/hello', function (err) {
				if (err) {
					this.resp.write(JSON.stringify({resp: "ko"}));//big problem upcoming
				} else {
					this.resp.write(JSON.stringify({resp: "ok"}));
				}
			});
			this.resp.end();
		}
	}
};
