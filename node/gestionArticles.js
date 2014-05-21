var util = require("util");
var fs = require("fs");
var db = require("./bdd_js.js");

var dirName = './article/';

/**
 * This function creates the article  environment and pushes content (images and videos if any | see later)
 * @param articleID (String): article identifier
 * @param b (JSON object): article data
 * @return (String): "ok" or "ko"
 */
exports.push_article_db = function (articleID, b, funcName) {
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
			b[funcName](dirPath, articleID);
		} else {
			this.resp.write(JSON.stringify({resp: "folder already existing"}));//if the folder already exists, then do not stop the process
			this.resp.end();
		};
	});
};
	
/**
 * This function writes the content of the article in a text file
 * @param dirPath (String) : article directory path
 * @param articleID (String) : article identifier
 * @param b (JSON object) : article data
 * @return (String) : "ok" or "ko"
 */
exports.push_content = function (dirPath, articleID, b, obj, funcName) {
	var articlePath = dirPath + "/" + articleID;
	var data = "{ title: \"" + b.title
				+ "\", content: \"" + b.content
				+ "}";
	console.log("OOBBBBJJJJJJJJJJJ: " + util.inspect(b));
	fs.exists(articlePath, function(exists) {
		if (!exists) {
			util.log ("file does not exist -> creation");
			fs.writeFile(articlePath, data, function(err) {
				if(err) {
					this.resp.write(JSON.stringify({resp: "error uploading file"}));
					this.resp.end();
				} else {
					obj[funcName](1);
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
 * @return (array of JSON objects): articles = [{title: 'title1', author: 'author1', date: 'date1', content: 'content1', idArticle: 'idArticle1'}, {title: 'title2', author: 'author2', date: 'date2', content: 'content2'}, ...]
 */
exports.load_articles = function (arrayArticleIdAndDate, obj, funcName) {
	var returnedArticles = new Array (),
		content,
		b;
	
	console.log("SIIIIIIIIIIIIIZE\narrayArticleIdAndDate.length: " + arrayArticleIdAndDate.length);
	
	if (!arrayArticleIdAndDate) {
		obj[funcName](0);
	} else {
		for (var i = 0 ; i < arrayArticleIdAndDate.length ; i ++) {
			var articlePath = dirName + arrayArticleIdAndDate[i].articleID + '/' + arrayArticleIdAndDate[i].articleID;
			console.log("tab recu: " + util.inspect(arrayArticleIdAndDate[i]));
			fs.readFile(articlePath, function (err, data) {
				if (err) {
					obj[funcName](0);
				} else {
					content = data;
					console.log("content: " + content);
					b = JSON.stringify(content);
					
					//console.log("data.title: " + data.title);
					//console.log("content.title: " + content.title);
					console.log("b.title: " + b.title);
					console.log("\n\n");
					
					var a = {title: b.title,
							content: b.content,
							date: arrayArticleIdAndDate[i].date,
							author: arrayArticleIdAndDate[i].author, articleId: arrayArticleIdAndDate[i].articleId
							};
								
								
					returnedArticles.push(a);
				}
			});
		};
		obj[funcName](returnedArticles);
	}
};

/**
 * This function deletes an article which id is given in parameter
 * @param articleId (Int): article id
 * @return (String): "ok" or "ko"
 */
exports.delete_article = function (articleId) {
	var articlePath = dirPath + articleId;//think about destroying the whole directory and its gatherings recursively
	fs.exists(articlePath, function(exists) {
		if (!exists) {
			this.resp.write(JSON.stringify({resp: "did not exist"}));//big problem upcoming
			this.resp.end();
		} else {
			fs.unlink(articlePath, function (err) {
				if (err) {
					this.resp.write(JSON.stringify({resp: "ko"}));
				} else {
					this.resp.write(JSON.stringify({resp: "ok"}));
				}
			});
			this.resp.end();
		}
	});
};
