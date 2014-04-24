/**
 * \author {Olivier ANTUNES, Loic PLARD, Jean GERVOSON}
 * \date 23 april 2014
 * \version 0.1
 * \brief Functions relationned with DB
 *
 * \details This file include all the function in relationship with the DB, except the initialisation process (@see initialisation.js)
 * 
 * List of functions :
 * 1 - create_cookie
 * 2 - insert
 * 3 - read
 * 4 - allRead
 * 5 - checkLog
 * 6 - subscribe
 * 7 - unSubscribe
 * 8 - checkSubscribeLog
 * 9 - submitArticle
 *
 */


var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./test.db");
var util = require("util");

var db_co = {};
db_co.rand_max = 1000000000000000;

/**
 * 1 - Create a near unique cookie
 * @param (string) username of the user
 * @return (string) new cookie if ok, 0 if we can't generate a cookie
 */
 //Test OK le 24/04
exports.create_cookie = function (username) {
	if (username && typeof username == "string") {
		var a = Math.random();
		var b = username.substring(0,3);
		a = b + Math.floor(a * db_co.rand_max);
		return a;
	}
	return 0;
};

/**
 * 2 - This function 
 * 
 */
// TODO: TEST function, is used for ??? TO delete if not it's not used
// Test NOK le 24/04 => Ne pas utiliser
exports.insert = function () {
    db.serialize( function () {
        var stmt = db.prepare("INSERT INTO test VALUES (?)");
        for (var a = 0;  a < 10; a++)  {
            stmt.run("" + a);
        }
        stmt.finalize();
    });
};

/**
 * 3 - This function read all the content of the DB
 * 
 */
 // TODO: delete it ?
exports.read = function () {
	var stmt = "SELECT * FROM test";
    db.each(stmt, function (e, r) {
        console.log(util.inspect(r));
    });
};

/**
* 4 - Test Function
*/
// Fonction de test => ne pas utiliser
exports.allRead = function(req, resp){
	util.log("***** Debut du Test *****");
	db_co.subscribe("olivier", "bob", this, "susbscribe"); // 2 - Insertion d'un user 
	//db_co.checkLog("blabla","iciCaDoitDireFaux"); // 3 - Controle du couple login/pass
	//db_co.submitArticle(12345, "WAIT");
	
	util.log("***** Fin du test *****");
};


/**
 * \brief 5 - checkLog function checks if the username & pswd puts in parameters are corrects
 * @param (string) log
 * @param (string) pw
 * @param (object) this
 * @param (string) func_name
 * @return (boolean) true or false 
 */
exports.checkLog = function (log, pw, obj, func_name) {
		util.log("CHECKLOG - Opening");
		//TODO : Update here the name of the table "test" 
		var stmt = "SELECT user FROM test WHERE user=\"" + log + "\" AND password=\"" + pw + "\"";
		var flag = 0;
		db.each(stmt, function (e, r) {
			if (e) {
				util.log("ERROR - SQL - CHECKLOG function : " + e);
			} else {
				if (r) {
					flag++;
				}
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("CHECKLOG - Closing");
};

/**
 * \brief 6 - Subscribe functions will add a new user on the website DB
 * @param (string) log
 * @param (string) pw
 * @param (object) this
 * @param (string) func_name 
 * @Return (boolean) true or false
 */
exports.subscribe = function (log, pw, obj, func_name) {
		util.log("SUBSCRIBE - Opening");
		//TODO : Update here the name of the table "test" 
		var stmt = "INSERT INTO test (user, password) VALUES (\"" + log + "\",\"" + pw + "\")";
		var flag = 0;
		db.each(stmt, function (e, r) {
			if(e) {
				util.log("ERROR - SQL - SUBSCRIBE function: " + e);
			} else {
				if (r) { 
					flag++;
				}
			}
		}, function() {
			obj[func_name](flag);
		});
	util.log("SUBSCRIBE - Closing");
};

/**
 * 7 - UnSubscribe functions will delete an user from the website DB
 * @param (string) log
 * @param (object) this
 * @param (string) func_name
 * @return (boolean) true or false
 */
exports.unSubscribe = function (log, obj, func_name) {
		util.log("UNSUBSCRIBE - Opening");
		//TODO : Update here the name of the table "test" 
		var stmt = "DELETE FROM test WHERE user =\""+log+"\"";
		var flag = 0;
		db.each(stmt, function (e,r) {
			if(e) {
				util.log("ERROR - SQL - UNSUBSCRIBE function : " + e);
			} else {
				if (r) { 
					flag++;
				}	
			}	
		}, function () {
			obj[func_name](flag);
		});
	util.log("UNSUBSCRIBE - Closing");
};

/**
 * \brief 8 - ChecksSubscribeLogs function checks if the username or the email is already insert in the website DB
 * @param (string) log
 * @param (string)email
 * @Return (boolean) true or false
 */ 
exports.checkSubscribeLog = function (log, email, obj, func_name) {
		util.log("CHECKSUBSCRIBELOG - Opening");
		//TODO : Update here the name of the table "test"
		var stmt = "SELECT user FROM test WHERE user=\"" + log + "\" OR email=\"" + email + "\"";
		var flag = 0;
		db.each(stmt, function (e, r) {
			if (e) {
				util.log("ERROR - SQL - checksusbscribeLogs: " + e);
			} else {
				if(r) {
					flag++;			
				}
			}
		}, function () {
			obj[fun_name](flag);
		});
	util.log("CHECKSUBSCRIBELOG - Closing");
};

/**
 * \detail 9 - SubmitArticle function adds an articleID and is status in the DB
 * it's used to submit an article which has to be checked before publication
 * @param (INT) articleID
 * @param (string) "OK", "NOK", or "WAIT"
 * @Return (string) true or false 
 */ 
exports.submitArticle = function (articleID, articleStatus, obj, func_name) {
		util.log("SUBMITAARTICLE - Opening");
		//TODO : Update here the name of the table "test" 
		var stmt = "INSERT INTO test (articleID, articleStatus) VALUES (\""+articleID+"\",\""+articleStatus+"\")";
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - submitArticle function: " + e);
			} else {
				util.inspect(r);
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("SUBMITAARTICLE - Closing");
};
