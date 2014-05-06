/**
 * \author {Olivier ANTUNES, Loic PLARD, Jean GERVOSON}
 * \date 23 april 2014
 * \version 1.0
 * \brief Functions relationned with DB
 *
 * \details This file includes all the function in relationship with the DB, except the initialisation process (@see initialisation.js)
 * 
 * List of functions :
 * 1 - create_cookie - TEST OK
 * 2 - insert - Ne pas utiliser
 * 3 - read - Ne pas utiliser
 * 4 - allRead - Ne pas utiliser - Fonction de Test uniquement
 * 5 - check_log - Test OK
 * 6 - register - Test OK
 * 7 - un_subscribe - Test OK
 * 8 - check_subscribe_log - Test OK
 * 9 - submit_article - Test OK
 * 10 - change_right - Test OK
 * 11 - check_data - Test OK
 * 12 - delete_article - Test OK
 * 13 - assign_cookie - Test OK 
 * 14 - check_cookie - Test OK
 * 15 - Create_ID - Test OK
 * 16 - valid_article - Test OK
 *
 */


//TODO: verifier les lignes SQL avec insertion de variable

// !!! TODO Général : bien nommer la BDD avant la final version 

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
 
exports.create_cookie = function (user) {
	return create_cookie(user);
};

var create_cookie = function (user) {
	if (user && typeof user == "string") {
		var a = Math.random();
		var b = user.substring(0,3);
		a = b + Math.floor(a * db_co.rand_max);
		return a;
	}
	return 0;
};

/**
 * 2 - This function 
 * 
 */
// TEST function, is used for ??? TO delete if not it's not used
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
 //DEBUG: delete it ?
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
 * \brief 5 - check_log function checks if the username & pswd puts in parameters are corrects
 * Test OK le 06/05
 * @param (string) log
 * @param (string) pw
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */
exports.check_log = function (log, pw, obj, func_name) {
		util.log("CHECK_LOG - Opening");
		var stmt = "SELECT user FROM test WHERE user=\"" + log + "\" AND password=\"" + pw +"\"";
		var flag = 0;
		db.each(stmt, function (e, r) {
			if (e) {
				util.log("ERROR - SQL - CHECK_LOG function : " + e);
			} else {
				if (r) {
					flag++;
				}
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("CHECK_LOG - Closing");
};

/**
 * \brief 6 - Register functions will add a new user on the website DB
 * Test OK le 06/05
 * @param (string) log
 * @param (string) pw
 * @param (INT) right
 * @param (object) this
 * @param (string) func_name 
 * @callback (boolean) calls the callback with a boolean argument
 */
exports.register = function (log, pw, right, obj, func_name) {
		util.log("REGISTER - Opening");
		var stmt = "INSERT INTO test (user, password, right) VALUES ( \""+log+"\"," + pw + "," + right+")";
		var flag = 0;
		db.each(stmt, function (e, r) {
			if(e) {
				util.log("ERROR - SQL - REGISTER function: " + e);
			} else {
				if (r) { 
					flag++;
				}
			}
		}, function() {
			obj[func_name](flag);
		});
	util.log("REGISTER - Closing");
};

/**
 * 7 - un_subscribe functions will delete an user from the website DB
 * Test OK le 06/05
 * @param (string) log
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */
exports.un_subscribe = function (log, obj, func_name) {
		util.log("UN_SUBSCRIBE - Opening");
		var stmt = "DELETE FROM test WHERE user =\""+log+"\"";
		var flag = 0;
		db.each(stmt, function (e,r) {
			if(e) {
				util.log("ERROR - SQL - UN_SUBSCRIBE function : " + e);
			} else {
				if (r) { 
					flag++;
				}	
			}	
		}, function () {
			obj[func_name](flag);
		});
	util.log("UN_SUBSCRIBE - Closing");
};

/**
 * \brief 8 - check_subscribe_log function checks if the username or the email is already insert in the website DB
 * Test OK le 06/05
 * @param (string) log
 * @param (string)email
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */ 
exports.check_subscribe_log = function (log, email, obj, func_name) {
		util.log("CHECK_SUBSCRIBE_LOG - Opening");
		var stmt = "SELECT user FROM test WHERE user=\"" + log + "\" OR email=\"" + email + "\"";
		var flag = 0;
		db.each(stmt, function (e, r) {
			if (e) {
				util.log("ERROR - SQL - CHECK_SUBSCRIBE_LOG: " + e);
			} else {
				if(r) {
					flag++;			
				}
			}
		}, function () {
			obj[fun_name](flag);
		});
	util.log("CHECK_SUBSCRIBE_LOG - Closing");
};

/**
 * \detail 9 - submit_article function adds an article in the DB
 * it's used to submit an article which has to be checked before publication
 * In default situation, the article has a status equal to 0, it's mean ths article is Waiting a validation. 
 * Test OK le 06/05 
 * @param (string) articleID
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */ 
exports.submit_article = function (articleID, obj, func_name) {
		util.log("SUBMIT_ARTICLE - Opening");
		var stmt = "INSERT INTO test (articleID, articleStatus) VALUES (\""+articleID+",0)";
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - SUBMIT_ARTICLE function: " + e);
			} else {
				util.inspect(r);
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("SUBMIT_ARTICLE - Closing");
};

/**
 * \detail 10 - This function changes the right of a user
 * TEST OK - 06/05
 * @param (string) user
 * @param (INT) right: 1 = super Admin, 2= Admin, 3=moderator, 4=redactor, 5=basic user
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */
exports.change_right = function (user, right, obj, func_name) {
		util.log("CHANGE_RIGHT - Opening");
		var stmt = "UPDATE test (right) VALUES (\""+right+"\") WHERE user=\"" + user + "\"";
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - CHANGE_RIGHT function: " + e);
			} else {
				util.inspect(r);
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("CHANGE_RIGHT - Closing");
};

/**
 * \detail 11 - check if this fields is inclued in the DB
 * Test OK le 06/05
 * @param (string) dbfield is the field in the DB you want to check with
 * @param (string) data is the data you want to compare in dbfield
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */
exports.check_data = function (dbfield, data, obj, func_name) {
		util.log("CHECK_DATA - Opening");
		var stmt = "SELECT "+dbfield+" FROM test WHERE " +dbfield+ "=" + data;
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - CHANGE_DATA function: " + e);
			} else {
				util.inspect(r);
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("CHECK_DATA - Closing");
};

/**
 * \detail 12 - delete_article function deletes an articleID
 * Test OK le 06/05
 * @param (string) articleID
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */ 
exports.delete_article = function (articleID, obj, func_name) {
		util.log("DELETE_ARTICLE - Opening");
		var stmt = "DELETE FROM test WHERE (articleID) VALUES ("+articleID+")";
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - DELETE_ARTICLE function: " + e);
			} else {
				util.inspect(r);
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("DELETE_ARTICLE - Closing");
};

/**
 * \detail 13 - Assign_Cookie function assigns a cookie to a user
 * Test OK
 * @param (string) user
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */ 
exports.assign_cookie = function (user, obj, func_name) {
		util.log("ASSIGN_COOKIE - Opening");
		var cookie = create_cookie(user);
		var stmt = "UPDATE test SET cookie = "+cookie+" WHERE user ="+ user ;
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - ASSIGN_COOKIE function: " + e);
			} else {
				util.inspect(r);
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("ASSIGN_COOKIE - Closing");
};

/**
 * \detail 14 - check_cookie function checks if the cookie inputs is equal with the cookie in DB
 * Test OK le 06/05
 * @param (string) user
 * @param (string) cookie
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */ 
exports.check_cookie = function (user,cookie, obj, func_name) {
		util.log("CHECK_COOKIE - Opening");
		var stmt = "SELECT user FROM test WHERE user= " + user + " AND cookie= " + cookie;
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - CHECK_COOKIE function: " + e);
			} else {
				util.inspect(r);
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("CHECK_COOKIE - Closing");
};

/**
 * \detail 15 - Create a article ID
 * Test OK le 06/05
 * @param (string) username of the user
 * @callback (boolean) calls the callback with a boolean argument
 */
exports.create_ID = function (user) {
	if (user && typeof user == "string") {
		var a = Math.random();
		var b = user.substring(0,3);
		a = b + Math.floor(a * db_co.rand_max);
		return a;
	}
	return 0;
};

/**
 * \detail 16 - valid_article function change the status of an article which is on wait(0) to OK  (1) 
 * Test OK le 05/05
 * @param (string) articleID
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */ 
exports.valid_article = function (articleID, obj, func_name) {
		util.log("VALID_ARTICLE - Opening");
		var stmt = "UPDATE test articleStatus = 1 WHERE articleID ="+articleID;
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - VALID_ARTICLE function: " + e);
			} else {
				util.inspect(r);
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("VALID_ARTICLE - Closing");
};

/**
 * \detail 16 - log_out function is called when the user log out the web site.
 * it's change the current cookie by 0. 
 * Test OK le 06/05
 * @param (string) articleID
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */ 
exports.log_out = function(user, obj, func_name) {
		util.log("LOG_OUT - Opening");
		var stmt = "UPDATE test cookie = 0 WHERE user = \""+user+"\"";
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - LOG_OUT function: " + e);
			} else {
				util.inspect(r);
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("LOG_OUT - Closing");
};
