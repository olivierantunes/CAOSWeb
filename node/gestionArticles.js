var util = require("util");
var fs = require("fs");

var dirName = './article/';

/*testing data
var b = {
	title: "titreArticle",
	author: "cestMoiLAuteur",
	content: "monContenu"
};

//var b = JSON.stringify(bob);
console.log ("title: " + b.title);
console.log ("content: " + b.content);
*/

/**
 * This function orders the operations to push an article in the db
 * @param b (JSON object) : article data = { title: 'title', author: 'author', content: 'content'}
 * @return (String) : "ok" or "ko"
 */
exports.submit_article = function (b) {
		var articleID = db.create_article_id();
		
		this.push_article_db (articleID, b);
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
				//util.log ("folder already exists");
				this.resp.write(JSON.stringify({resp: "folder already existing"}));
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
push_content = function (dirPath, articleID, b) {
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
				//util.log ("file already exists");
				this.resp.write(JSON.stringify({resp: "file already existing"}));
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
	
/**
 * This function loads every article //this function is called by the db articleStatus, object, functName
 * @param t (Array): TODO
 * @return (JSON object): article = { title: 'title', author: 'author', date: 'date', content: 'content'} //array of json objects
 */
load_articles:
    function (articleIdArray) {
		//-> db function returns: array (id1, id2, ...)
		//var articleArray [];
		for (id in articleIdArray) {
			var articlePath = dirPath + '/' + id + '/' + id;
			fs.readFile(articlePath, function (e, d) {
				if (e) {
					this.resp.write(JSON.stringify({resp: "error uploading file"}));
				} else {
					//JSON.stringify(file)
					//push file to array
				}
			}
		}
    },