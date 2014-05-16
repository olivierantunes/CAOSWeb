var util = require("util");
var fs = require("fs");
//var db = require("./bdd_js.js");

var dirName = './article/';

//testing data
var b = {
	title: "titreArticle",
	author: "cestMoiLAuteur",
	content: "monContenu"
};

/**
 * This function orders the operations to push an article in the db
 * @param b (JSON object) : article data = { title: 'title', author: 'author', content: 'content'}
 * @return (String) : "ok" or "ko"
 */
exports.submit_article = function (b) {
		//var articleID = db.create_article_id();uncomment
		var articleID = 444;
		push_article_db (articleID, b);
	},
	
/**
 * This function creates the article  environment and pushes content (images and videos if any | see later)
 * @param articleID (String) : article identifier
 * @param b (JSON object) : article data
 * @return (String) : "ok" or "ko"
 */
push_article_db = function (articleID, b) {
		var dirPath = dirName + articleID;
		
		fs.exists(dirPath, function(exists) {
			if (!exists) {
				util.log ("folder does not exist -> creation");
				fs.mkdir(dirPath, function() {
					fs.mkdir(dirPath, function(error) {
						if (error && error.errno === 34) {
							fs.mkdirParent(path.dirname(dirPath), mode, callback);
							fs.mkdirParent(dirPath, mode, callback);
						}
					});
				});
			} else {
				//this.resp.write(JSON.stringify({resp: "folder already existing"})); uncomment - > if the folder already exists, then do not stop the process
				util.log("folder already existing");//delete
			};
		});
		
		this.push_content (dirPath, articleID, b);
	},
	
/**
 * This function writes the content of the article in a text file
 * @param dirPath (String) : article directory path
 * @param articleID (String) : article identifier
 * @param b (JSON object) : article data
 * @return (String) : "ok" or "ko"
 */
push_content = function (dirPath, articleID, b) {
		var articlePath = dirPath + '/' + articleID;
		var data = '{title: ' + b.title + ', author: ' + b.author + ', content: ' + b.content + '}';
		
		fs.exists(articlePath, function(exists) {
			if (!exists) {
				util.log ("file does not exist -> creation");
				fs.writeFile(articlePath, data, function(err) {
					if(err) {
						//this.resp.write(JSON.stringify({resp: "error uploading file"})); uncomment - > if the file already exists, then do not stop the process
						util.log ("error creating file\n");//delete
					} else {
						//this.resp.write(JSON.stringify({resp: "file saved"}));uncomment
						util.log ("file saved");
					}
				});
			} else {
				//this.resp.write(JSON.stringify({resp: "file already existing"}));uncomment
				util.log ("file already exists");//delete
			}
		});
		
		//this.resp.end();uncomment
	},
	
/**
 * This function loads every article of which ids in param
 * @param dirPath (Array): array of articles ids
 * @return (array of JSON objects): articles = [{title: 'title1', author: 'author1', date: 'date1', content: 'content1'}, {title: 'title2', author: 'author2', date: 'date2', content: 'content2'}, ...]
 */
exports.load_articles = function (dirName) {
		//articleIdArray = db.order_article (articleStatus, obj, func_name);uncomment
		var articleIdArray = new Array (),//delete
			articleIdArray = ["12", "444", "666"],//delete
			returnedArticles = new Array (),
			flag = 0;
		
		//delete from here
		console.log(articleIdArray [0]);
		console.log(articleIdArray [1]);
		console.log(articleIdArray [2]);
		console.log("\n");
		//to here
		
		if (!articleIdArray) {
			//this.resp.write(JSON.stringify({resp: "articles array transmission failed"}));uncomment
			util.log ("array transmission failed");//delete
		} else {
			for (id in articleIdArray) {
				var articlePath = dirName + '/' + id + '/' + id;
				fs.readFile(articlePath, function (err, data) {
					if (err) {
						flag = 1;
						util.log("error loading article");//delete
					} else {
						returnedArticles.push(data);
						util.log("article loaded\n");//delete
					}
				});
			};
		}
		
		//delete from here
		console.log("flag = " + flag + "\n");
		if (flag) {
			//do nothing
		} else {
			console.log("test\n");
			for (id in returnedArticles) {
				util.log(returnedArticles [id]);//empty
			};
		}
		console.log("\n");
		//to here
		
		if (!flag) {
			//this.resp.write(JSON.stringify({resp: "ko"}));uncomment
			util.log("load failed");
		} else {
			//this.resp.write(JSON.stringify(returnedArticles));uncomment
			util.log("load successful");
			this.test_load_articles (returnedArticles);//delete
		}
		test_load_articles (returnedArticles);//delete
		//this.resp.end();uncomment
    }
//test function: display operations results
test_load_articles = function (tabJsonArt) {
		for (id in tabJsonArt) {
			console.log(id + "\n");
		};
	},

//this.submit_article (b);
this.load_articles (dirName);
