var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./test.db");
var util = require("util");

var db_co = {};
db_co.rand_max = 1000000000000000;
/**
 * Create a near unique cookie
 * @param (string) username of the user
 * @return (string) new cookie if ok, 0 if we can't generate a cookie
 */
exports.create_cookie = function (username) {
	if (username && typeof username == "string") {
		var a = Math.random();
		var b = username.substring(0,3);
		a = b + Math.floor(a * db_co.rand_max);
		return a;
	}
	return 0;
};

db_co.create = function () {
	util.log("CREATE - Opening");
	db.run("CREATE TABLE test (info TEXT, user TEXT PRIMARY KEY, password TEXT, articleID INT, articleStatus VARCHAR(10))");
	util.log("CREATE - Closing");
};

db_co.insert = function () {
    db.serialize( function () {
        var stmt = db.prepare("INSERT INTO test VALUES (?)");
        for (var a = 0;  a < 10; a++)  {
            stmt.run("" + a);
        }
        stmt.finalize();
    });
};

db_co.read = function () {
    var stmt = "SELECT * FROM test";
	util.log("in db_co.read");
    db.each(stmt, function (e, r) {
        console.log(util.inspect(r));
    });
};

//db_co.read();

exports.read = function () {
	var stmt = "SELECT * FROM test";
    db.each(stmt, function (e, r) {
        console.log(util.inspect(r));
    });
};

/**
* Test Function
*/
exports.allRead = function(req, resp){
	util.log("IN - allRead function");
	var login = "bob";
	var pass = "booby";
	db_co.create(); //1 - Creation de la table
	db_co.subscribe(login, pass); // 2 - Insertion d'un user 
	db_co.checkLog("blabla","iciCaDoitDireFaux"); // 3 - Controle du couple login/pass
	db_co.submitArticle(12345, "WAIT");
	
	// util.log("***** Fin du test *****");
};


/**
 * Created by Olivier ANTUNES
 * checkLog function checks if the username & pswd puts in parameters are corrects
 * @param log
 * @param pw
 * @return true or false 
 */
db_co.checkLog = function (log, pw, obj, func_name) {
		util.log("CHECKLOG - Opening");
		//TODO : Update here the name of the table "test" 
		var stmt = "SELECT user FROM test WHERE user=\"" + log + "\" AND password=\"" + pw + "\"";
		var flag = 0;
		db.each(stmt, function (e, r) {
			if (e) {
				util.log("ERROR - SQL - checklogs function : " + e);
			} else {
				//util.inspect(r);
				if (r) {
					flag++;
				}
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("CHECKLOG - Closing");
};

//TODO: génrer un cookie et lui renvoyer dans un objet
//TODO: créer un init.js
//TODO: 
/**
*Created by Olivier ANTUNES
*Subscribe functions will add a new user on the website DB
*@param log
*@param pwd
*@Return: true or false
*/
exports.subscribe = function (log,pw) {
		util.log("SUBSCRIBE - Opening");
		//TODO : Update here the name of the table "test" 
		var stmt = "INSERT INTO test (user, password) VALUES (\""+log+"\",\""+pw+"\")";
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - subscribe function: " + e);
			return false;
			} else {
				util.inspect(r);
				util.log("SUBSCRIBE - TRUE");
				return true;
			}
		});
	util.log("SUBSCRIBE - Closing");
};
/**
*Created by Olivier ANTUNES
*UnSubscribe functions will delete an user from the website DB
*@param log
*@Return true or false
*/
db_co.unSubscribe = function (log) {
		util.log("SUBSCRIBE - Opening");
		//TODO : Update here the name of the table "test" 
		var stmt = "DELETE FROM test WHERE user =\""+log+"\"";
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - unSubscribe function : " + e);
			} else {
				util.inspect(r);
			}
		});
	util.log("SUBSCRIBE - Closing");
};

/**
*Created by Olivier ANTUNES
*ChecksSubscribeLogs function checks if the username or the email is already insert in the website DB
*@param log
*@param email
*@Return: true or false
*/
db_co.checkSubscribeLog = function (log, email) {
		util.log("CHECKSUBSCRIBELOG - Opening");
		//TODO : Update here the name of the table "test"
		var stmt = "SELECT user FROM test WHERE user=\"" + log + "\" OR email=\"" + email + "\"";
		db.each(stmt, function (e, r) {
			if (e) {
				util.log("ERROR - SQL - checksusbscribeLogs: " + e);
			} else {
				util.inspect(r);
				util.log("CHECKSUBSCRIBELOG - OK"); //si le mec est log vérif avant ce qu'il y a dans r;
			}
		});
		util.log("CHECKSUBSCRIBELOG - Closing");
};

/**
*Created by Olivier ANTUNES
*submitArticle function adds an articleID and is status in the DB
*it's used to submit an article which has to be checked before publication
*@param articleID
*@param arcticleStatus
*@Return true (if OK) or false (if NOK)
*/
db_co.submitArticle = function (articleID, articleStatus) {
		util.log("SUBMITAARTICLE - Opening");
		//TODO : Update here the name of the table "test" 
		var stmt = "INSERT INTO test (articleID, articleStatus) VALUES (\""+articleID+"\",\""+articleStatus+"\")";
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - submitArticle function: " + e);
			} else {
				util.inspect(r);
			}
		});
		util.log("SUBMITAARTICLE - Closing");
};
