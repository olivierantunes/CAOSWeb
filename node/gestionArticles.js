var util = require("util");
var fs = require("fs");

var dirName = './article/';

//testing data
var b = {
	title: "titreArticle",
	author: "cestMoiLAuteur",
	content: "monContenu"
};

//var b = JSON.stringify(bob);
console.log ("title: " + b.title);
console.log ("content: " + b.content);

/**
 * This function orders the operations to push an article in the db
 * @param b (JSON object) : article data = { title: 'title', author: 'author', content: 'content'}
 * @return (String) : "ok" or "ko"
 */
exports.submit_article = function (b) {
		//Step 1: ask for articleID
		//var articleID = create_article_id();
		
		//test data
		var articleID = 666; //for testing
		
		//retesting
		console.log ("\n\ninto function:\ntitle: " + b.title);
		console.log ("content: " + b.title);
		
		//Step 2: push file then content
		this.push_article_db (articleID, b);
	},
	
/**
 * This function creates the article  environment and pushes content (images and videos if any | see later)
 * @param articleID (String) : article identifier
 * @param b (JSON object) : article data
 * @return (String) : "ok" or "ko"
 */
exports.push_article_db = function (articleID, b) {
		var dirPath = dirName + articleID;
		
		fs.exists(dirPath, function(exists) {
			util.log ("folder does not exist -> creation");
			if (!exists) {
				fs.mkdirParent = function(dirPath, mode, callback) {
					fs.mkdir(dirPath, mode, function(error) {
						if (error && error.errno === 34) {
							fs.mkdirParent(path.dirname(dirPath), mode, callback);
							fs.mkdirParent(dirPath, mode, callback);
						}
						callback && callback(error);
					});
				}
			} else {
				util.log ("folder already exists");
			};
		});
		
		//for testing
		//delete from here
		fs.exists(dirPath, function(exists) {
			if (exists) {
				util.log ("folder successfully created");
			} else {
				util.log ("failed creating folder");
			}
		});
		//to here
		
		//TODO: call function to push
		this.push_content (dirPath, articleID, b);
	},
	
/**
 * This function writes the content of the article in a text file
 * @param dirPath (String) : article directory path
 * @param articleID (String) : article identifier
 * @param b (JSON object) : article data
 * @return (String) : "ok" or "ko"
 */
exports.push_content = function (dirPath, articleID, b) {
		var articlePath = dirPath + '/' + articleID;
		var data = '{ title: ' + b.title + ', author: ' + b.author + ', content: ' + b.content + '}';
		
		fs.exists(articlePath, function(exists) {
			if (!exists) {
				util.log ("file does not exist -> creation");
				fs.writeFile(articlePath, data, function(err) {
					if(err) {
						//this.resp.write(JSON.stringify({resp: "error uploading file"})); //uncomment
						util.log ("error creating file\n");
					} else {
						//this.resp.write(JSON.stringify({resp: "file saved"})); //uncomment
						util.log ("file saved");
					}
				});
			} else {
				util.log ("file already exists");
			}
		});
		
		//delete
		//from here
		fs.readFile(articlePath, function (err, data) {
			if (err) util.log ("error (articlePath = " + articlePath + ")\n"); //throw err;
			console.log("data: " + data);
		});
		//to here
		
		//this.resp.end(); //uncomment
	},
	
this.submit_article (b);