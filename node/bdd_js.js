/**
 * \author {Olivier ANTUNES, Loic PLARD, Jean GERVOSON}
 * \date 23 april 2014
 * \version 1.0
 * \brief Functions relationned with DB
 *
 * \details This file include all the function in relationship with the DB, except the initialisation process (@see initialisation.js)
 * 
 * List of functions :
 * 1 - create_cookie - TEST OK
 * 2 - insert - Ne pas utiliser
 * 3 - read - Ne pas utiliser
 * 4 - allRead - Ne pas utiliser - Fonction de Test uniquement
 * 5 - checkLog - Test OK
 * 6 - register - Test OK
 * 7 - unSubscribe - Test OK
 * 8 - checkSubscribeLog - Test OK
 * 9 - submitArticle - Test OK
 * 10 - changeRight - Test OK
 * 11 - checkData - Test NOK
 *
 */


//TODO: fair une fonction check_cookie
//TODO: fonction to genere l'ID de l'article
// TODO: reflechir à comment insérer un article
// TODO Général : bien nommer la BDD avant la final version 
// TODO changer les insert into en update

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
 * \brief 5 - checkLog function checks if the username & pswd puts in parameters are corrects
 * Test OK le 24/04
 * @param (string) log
 * @param (string) pw
 * @param (object) this
 * @param (string) func_name
 * @return (boolean) true or false 
 */
// TODO: ajouter cookie
exports.checkLog = function (log, pw, obj, func_name) {
		util.log("CHECKLOG - Opening");
		var cookie = create_cookie(log);
		var stmt = "SELECT user FROM test WHERE user=\"" + log + "\" AND password=\"" + pw +"\"";
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
 * \brief 6 - Register functions will add a new user on the website DB
 * Test OK le 24/04
 * @param (string) log
 * @param (string) pw
 * @param (INT) right
 * @param (object) this
 * @param (string) func_name 
 * @Return (boolean) true or false
 */
exports.register = function (log, pw, right, obj, func_name) {
		util.log("REGISTER - Opening");
		//TODO : Update here the name of the table "test" 
		var stmt = "INSERT INTO test (user, password, right) VALUES (\"" + log + "\",\"" + pw + "\",\"" + right"\"")";
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
 * 7 - UnSubscribe functions will delete an user from the website DB
 * Test OK le 24/04
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
 * Test OK le 24/04
 * @param (string) log
 * @param (string)email
 * @param (object) this
 * @param (string) func_name
 * @return (boolean) true or false
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
 * Test OK le 24/04 
 * @param (INT) articleID
 * @param (string) "OK", "NOK", or "WAIT"
 * @param (object) this
 * @param (string) func_name
 * @return (boolean) true or false
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

/**
 * \detail 10 - This function changes the right of a user
 * TEST OK - 24/04
 * @param (string) log
 * @param (INT) right: 1 = super Admin, 2= Admin, 3=moderator, 4=redactor, 5=basic user
 * @param (object) this
 * @param (string) func_name
 * @return (boolean) true or false
 */
exports.changeRight = function (log, right, obj, func_name) {
		util.log("CHANGERIGHT - Opening");
		//TODO : Update here the name of the table "test" 
		var stmt = "INSERT INTO test (right) VALUES (\""+right+"\") WHERE user=\"" + log + "\"";
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - CHANGERIGHT function: " + e);
			} else {
				util.inspect(r);
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("CHANGERIGHT - Closing");
};

/**
 * \detail 11 - check if this fields is inclued in the DB
 * NOT TESTED YET
 * @param (string) log
 * @param (INT) right: 1 = super Admin, 2= Admin, 3=moderator, 4=redactor, 5=basic user
 * @param (object) this
 * @param (string) func_name
 * @return (boolean) true or false
 */
exports.checkData = function (dbfield, data, obj, func_name) {
		util.log("CHECKDATA - Opening");
		//TODO : Update here the name of the table "test" 
		var stmt = "SELECT "\""+dbfield+"\"FROM test WHERE ""\"+dbfield+"=\"" + data;
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - CHANGERIGHT function: " + e);
			} else {
				util.inspect(r);
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("CHECKDATA - Closing");
};

/**
 * \detail 12 - DeleteArticle function deletes an articleID
 * it's used to delete an article which has to be checked before publication
 * Test 
 * @param (INT) articleID
 * @param (object) this
 * @param (string) func_name
 * @return (boolean) true or false
 */ 
exports.submitArticle = function (articleID, obj, func_name) {
		util.log("DELETEARTICLE - Opening");
		//TODO : Update here the name of the table "test" 
		var stmt = "DELETE FROM test WHERE (articleID) VALUES (\""articleID"\")";
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - deleteArticle function: " + e);
			} else {
				util.inspect(r);
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("DELETEARTICLE - Closing");
};

/**
 * \detail 13 - AssignCookie function deletes an articleID
 * it's used to delete an article which has to be checked before publication
 * Test 
 * @param (INT) username
 * @param (object) this
 * @param (string) func_name
 * @return (boolean) true or false
 */ 
exports.assignCookie = function (user, obj, func_name) {
		util.log("ASSIGNCOOKIE - Opening");
		var cookie = create_cookie(log);
		var stmt = "UPDATE test SET cookie = "+cookie+" WHERE user = user ";
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - ASSIGNCOOKIE function: " + e);
			} else {
				util.inspect(r);
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("ASSIGNCOOKIE - Closing");
};
