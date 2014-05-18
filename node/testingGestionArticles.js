var util = require("util");
var fs = require("fs");
var db = require("./bdd_js.js");

var dirName = './article/';

var arrayArticleIdAndDate = {date: 'date1', content: 'content1', idArticle: 'idArticle1'}
	
/**
 * This function loads every article of which ids in param
 * @param dirPath (Array): array of article ids
 * @return (array of JSON objects): articles = [{title: 'title1', author: 'author1', date: 'date1', content: 'content1', idArticle: 'idArticle1'}, {title: 'title2', author: 'author2', date: 'date2', content: 'content2'}, ...]
 */
load_articles = function (arrayArticleIdAndDate, obj, nameFunc) {//deleted the 'exports.'
	var returnedArticles = new Array ();
	
	if (!arrayArticleIdAndDate) {
		this.resp.write(JSON.stringify({resp: "articles array transmission failed"}));
	} else {
		for (var i = 0 ; i < arrayArticleIdAndDate.length ; i ++) {
			var articlePath = dirName + arrayArticleIdAndDate[i].articleID + '/' + arrayArticleIdAndDate[i].articleID;
			fs.readFile(articlePath, function (err, data) {
				if (err) {
					this.resp.write(JSON.stringify({resp: "failed loading article"}));//check if true
					this.resp.end();
				} else {
					var object = '{title: ' + data.title 
								+ ', author: ' + data.author 
								+ ', content: ' + data.content 
								+ ', date: ' + arrayArticleIdAndDate[i].date 
								+ ', articleId: ' + arrayArticleIdAndDate[i].articleId + '}';
					returnedArticles.push(data);
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
delete_article = function (articleId) {
	var articlePath = dirPath + articleId;//think about destroying the whole directory and its gatherings recursively
	fs.exists(articlePath, function(exists) {
		if (!exists) {
			this.resp.write(JSON.stringify({resp: "did not exist"}));//big problem upcoming
			this.resp.end();
		} else {
			fs.unlink(articlePath, function (err) {
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
