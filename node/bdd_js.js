/**
 * \author {Olivier ANTUNES, Loic PLARD, Jean GERVOSON}
 * \date april 2014
 * \version 1.0
 * \brief Functions relationned with DB
 *
 * \details This file includes all the function in relationship with the DB, except the initialisation process (@see initialisation.js)
 * 
 * List of functions :
 * 1 - create_cookie - TEST OK
 * 2 - check_log - Test OK
 * 3 - register_blog - Test OK
 * 4 - unsubscribe - Test OK
 * 5 - check_subscribe_log - Test OK
 * 6 - submit_article - Test OK
 * 7 - change_right - Test OK
 * 8 - check_data - Test OK
 * 9 - delete_article - Test OK
 * 10 - assign_cookie - Test OK 
 * 11 - check_cookie - Test OK
 * 12 - Create_ID - Test OK
 * 13 - update_article_status - Test OK
 * 14 - log_out - Test OK
 * 15 - modif_pw - TEST OK
 * 16 - order_article - Test OK
 * 17 - users_list - Test OK
 * 18 - get_user - Test OK
 * 19 - get_date - Test OK
 * 20 - get_right - TEST OK
 * 21 - get_user_reg - TEST OK
 * 22 - Register - Test OK
 * 23 - get_site - TEST OK
 *
 * 99 - test function Not used
 *
 */

// !!! TODO Général : bien nommer la BDD avant la version finale

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./test.db");
var util = require("util");

var db_co = {};
db_co.rand_max = 1000000000000000;

/**
 * \brief 1 - Create a near unique cookie
 * Test OK le 24/04
 * @param (string) username of the user
 * @return (string) new cookie if ok, 0 if we can't generate a cookie
 */
exports.create_cookie = function (user) {
	return create_cookie(user);
};

var create_cookie = function (user) {
	console.log("create_cookie user: " + user);
	if (user && typeof user == "string") {
		var a = Math.random();
		var b = user.substring(0,3);
		a = b + Math.floor(a * db_co.rand_max);
		return a;
	}
	return 0;
};

/**
 * \brief 2 - check_log function checks if the username & pswd puts in parameters are corrects
 * Test OK le 06/05
 * @param (string) log
 * @param (string) pw
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument: 1 if log and mail ok, else 0
 */
exports.check_log = function (email, pw, obj, func_name) {
		util.log("CHECK_LOG - Opening");
		var stmt = "SELECT user FROM test WHERE email=\"" + email + "\" AND password=\"" + pw +"\"";
		var flag = 0;
		db.each(stmt, function (e, r) {
			if (e) {
				util.log("ERROR - SQL - CHECK_LOG function : " + e);
			} else {
				if (r) {
					flag++;
				}
			}
		}, function (err,n) {
			console.log ("CHECK_LOG--------------------------\nerr: " + err + "\nnb lines = " + n);
			obj[func_name](flag);
		});
	util.log("CHECK_LOG - Closing");
};

/**
 * \brief 3 - Register_blog functions will add a new user on the website DB
 * Test OK le 06/05
 * @param (string) log
 * @param (string) pw
 * @param (string) email
 * @param (INT) right
 * @param (object) this
 * @param (string) func_name 
 * @callback (boolean) calls the callback with a cookie value
 */
exports.register_blog = function (log, pw, email, right, obj, func_name) {
		util.log("REGISTER_BLOG - Opening");
		var cookie_reg  = create_cookie(log);
		var stmt = "INSERT INTO test (user, password, email , cookie_reg, right, site) VALUES ( \""+log+"\",\"" + pw + "\",\"" + email + "\",\"" + cookie_reg + "\",\"" + right+"\")";		
		db.each(stmt, function (e, r) {
			if(e) {
				util.log("ERROR - SQL - REGISTER_BLOG function: " + e);
			} else {
				if (r) { 
				}
			}
		}, function() {
			obj[func_name](cookie_reg);
		});
	util.log("REGISTER_BLOG - Closing");
};

/**
 * \brief 4 - unsubscribe functions will delete an user from the website DB
 * Test OK le 06/05
 * @param (string) log
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */
exports.unsubscribe = function (log, obj, func_name) {
		util.log("UNSUBSCRIBE - Opening");
		var stmt = "DELETE FROM test WHERE user = \""+log+"\"";
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
 * \brief 5 - check_subscribe_log function checks if the username or the email is already insert in the website DB
 * Test OK le 06/05
 * @param (string) log
 * @param (string)email
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument: 1 <=> log and/or already existing, else 0
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
			console.log("flag: " + flag);
			obj[func_name](flag);
		});
	util.log("CHECK_SUBSCRIBE_LOG - Closing");
};

/**
 * \brief 6 - this function inserts an article 
 * Test OK le 06/05 
 * @param author (String): article author
 * @param this (object)
 * @param func_name (String): callback function name
 * @callback (boolean) with articleId for success, 0 for failure
 */ 
exports.submit_article = function (author, obj, func_name) {
		util.log("SUBMIT_ARTICLE - Opening");
		var articleID = create_cookie(author),
			td = new Date(),
			d = td.getDate(),
			m = td.getMonth() + 1,
			stmt = "INSERT INTO test (articleID, articleStatus, author, date) VALUES (\""
					+ articleID
					+ "\",0,\""
					+ author 
					+ "\",\""+td+"\")";
		
		td = m + "/" + d;
		
		db.each(stmt, function (e,r) {
				if (e) {
					util.log("ERROR - SQL - SUBMIT_ARTICLE function: " + e);
					obj[func_name](0);
				}
			}, function (err,n) {
				console.log("pushed to db with success");
				obj[func_name](articleID);
			});
	util.log("SUBMIT_ARTICLE - Closing");
};

/**
 * \brief 7 - This function changes the right of a user
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
				if (r) {
					flag++;
					util.inspect(r);
				}
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("CHANGE_RIGHT - Closing");
};

/**
 * \brief 8 - check if this fields is inclued in the DB
 * Test OK le 06/05
 * @param (string) dbfield is the field in the DB you want to check with
 * @param (string) data is the data you want to compare in dbfield
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */
exports.check_data = function (dbfield, data, obj, func_name) {
		util.log("CHECK_DATA - Opening");
		var stmt = "SELECT "+dbfield+" FROM test WHERE \"" +dbfield+ "\"=\"" + data+"\"";
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - CHANGE_DATA function: " + e);
			} else {
				if (r) {
					flag++;
					util.inspect(r);
				}
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("CHECK_DATA - Closing");
};

/**
 * \brief 9 - delete_article function deletes an articleID
 * Test OK le 06/05
 * @param (string) articleID
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */ 
exports.delete_article = function (articleID, obj, func_name) {
		util.log("DELETE_ARTICLE - Opening");
		var stmt = "DELETE FROM test WHERE (articleID) VALUES (\""+articleID+"\")";
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - DELETE_ARTICLE function: " + e);
			} else {
				if (r) {
					flag++;
					util.inspect(r);
				}
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("DELETE_ARTICLE - Closing");
};

/**
 * \brief 10 - Assign_Cookie function assigns a cookie to a user
 * Test OK
 * @param (string) user
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with the cookie
 */ 
exports.assign_cookie = function (email, obj, func_name) {
		util.log("ASSIGN_COOKIE - Opening");
		var cookie = create_cookie(email);
		var stmt = "UPDATE test SET cookie = \""+cookie+"\" WHERE email =\""+ email +"\"" ;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - ASSIGN_COOKIE function: " + e);
			} else {
				util.inspect(r);
			}
		}, function () {
			obj[func_name](cookie);
		});
	util.log("ASSIGN_COOKIE - Closing");
};

/**
 * \brief 11 - check_cookie function checks if the cookie inputs is equal with the cookie in DB
 * Test OK le 06/05
 * @param (string) user
 * @param (string) cookie
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */ 
exports.check_cookie = function (user,cookie, obj, func_name) {
		util.log("CHECK_COOKIE - Opening");
		var stmt = "SELECT user FROM test WHERE user= \"" + user + "\" AND cookie= \"" + cookie+"\"";
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - CHECK_COOKIE function: " + e);
			} else {
				if (r) {
					flag++;
					util.inspect(r);
				}
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("CHECK_COOKIE - Closing");
};

/**
 * \brief 12 - Create a article ID
 * Test OK le 06/05
 * @param (string) username of the user
 * @callback (string) the ID or a "0" if the function does not work.
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
 * \brief 13 - update_article_status function change the status of an article which is on wait(0) to OK  (1) 
 * Furthermore, it update the date of the validation of the article 
 * Test OK le 13/05
 * @param (string) articleID
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */ 
exports.update_article_status = function (articleID, obj, func_name) {
		util.log("UPDATE_ARTICLE - Opening");
		var stmt = "UPDATE test articleStatus = 1, date = NOW() WHERE articleID =\""+articleID+"\"";
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - UPDATE_ARTICLE function: " + e);
			} else {
				if (r) {
					flag++;
					util.inspect(r);
				}
			}
		}, function () {
			obj[func_name](flag);
		});
	util.log("UPDATE_ARTICLE - Closing");
};

/**
 * \brief 14 - log_out function is called when the user log out the web site.
 * it's change the current cookie by 0. 
 * Test OK le 06/05
 * @param (string) cookie
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */ 
exports.log_out = function(cookie, obj, func_name) {
		util.log("LOG_OUT - Opening");
		var stmt = "UPDATE test SET cookie = 'null' WHERE cookie = \""+cookie+"\"";
		var flag = 0;
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - LOG_OUT function: " + e);
			} else {
				if (r) {
					flag++;
					console.log("LAAAAAAAAAAAAAAAAAAA = " + util.inspect(r));
				}
			}
		}, function (err,n) {
			console.log ("err: " + err + "\nnb lines = " + n + "\nFLAG: " + flag);
			obj[func_name](flag);
		});
	util.log("LOG_OUT - Closing");
};

/**
 * \brief 15 - modif_pw modify the password of the user in the DB 
 * Test OK le 06/05
 * @param (string) user
 * @param (string) pw
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a boolean argument
 */ 
exports.modif_pw = function(user, pw, obj, func_name) {
	util.log("MODIF_PW - Opening");
	var stmt = "UPDATE test password = \""+pw+"\" WHERE user = \""+user+"\"";
	var flag = 0;
			db.each(stmt, function (e,r) {
			if(e) {
				util.log("ERROR - SQL - MODIF_PW function: " + e);
				} else {
					if (r) {
					flag++;
					util.inspect(r);
					}
				}
			}, function () {
				obj[func_name](flag);
			});
		util.log("MODIF_PW - Closing");
};

/**
 * \brief 16 - This function looks for the last five articles pushed into the db (with date)
 * Test OK le 10/05
 * @param articleStatus (Int): 1 for validated articles, 0 (default status) else
 * @param this(object) 
 * @param func_name (String):
 * @callback 
 */ 

exports.order_article = function(articleStatus, obj, func_name) {
	util.log("ORDER_ARTICLE - Opening");
	
	var stmt = "select articleID,author,date,articleStatus from test where articleStatus = " + articleStatus,//+ "\"ORDER BY date DSC LIMIT 5",
		a = new Array();
		
	console.log("\n\narticleStatus: " + articleStatus);
	console.log("stmt: " + stmt + "\n");
	
	db.each(stmt, function (e,r) {
			if (e) {
				util.log("ERROR - SQL - ORDER_ARTICLE function: " + e);
				obj[func_name](0);
			}
			
			var j = {articleId: r.articleId,
					author: r.author,
					date: r.date
					};
					
			a.push({articleID: r.articleID, date: r.date, author: r.author});
		}, function () {
			obj[func_name](a);
		});
	util.log("ORDER_ARTICLE - Closing");
};

/**
 * \brief 17 - Users_list function gives you the list of all registered members 
 * the functions gives you the result in a array of JSON object : user, email, right
 * Test OK le 14/05
 * @param (object) this
 * @param (string) func_name
 * @callback calls the callback with an array wich includes the list of users : user (STRING), email (STRING), right (INT)
 */
exports.users_list = function(obj, func_name) {
	util.log("USERS_LIST - Opening");
	var stmt = "SELECT * FROM test ORDER BY date" ;
	var art = new Array();
	db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - USERS_LIST function: " + e);
		} else {
			var u = {user: r.user,
					email: r.email,
					right: r.right};
			art.push(u);
		}}, function () {
			obj[func_name](art);
		});
	util.log("USERS_LIST - Closing");
};

/**
 * \brief 18 - get_user gives you the user corresponding to the input cookie
 * Test OK le 16/05 
 * @param (string) cookie is the cookie of the user you want to identify
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with a JSON argument
 */
exports.get_user = function (cookie, obj, func_name) {
		util.log("GET_USER - Opening");
		var rep;
		var stmt = "SELECT user FROM test WHERE cookie =\"" + cookie +"\"";
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - GET_USER function: " + e);
			} else {
				if (r) {
					rep = r;
				}
			}
		}, function () {
			obj[func_name](rep);
		});
	util.log("GET_USER - Closing");
};

/**
 * \brief 19 - get_date gives you the date corresponding to an articleID 
 * test OK le 17/05
 * @param (string) articleID is the cookie of the user you want to identify
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with an array
 */
exports.get_date = function (articleID, obj, func_name) {
		util.log("GET_DATE - Opening");
		var stmt = "SELECT date FROM test WHERE articleID =\"" + articleID +"\"";
		var art = new Array();
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - GET_DATE function: " + e);
			} else {
				util.inspect(r);
			}
			art.push(r);
		}, function () {
			obj[func_name](art);
		});
	util.log("GET_DATE - Closing");
};

/**
 * \brief 20 - get_right gives you the user right corresponding to the cookie inputs 
 * Test OK le  17/05 
 * @param (string) cookie is the cookie of the user you want to know the right
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with an array with only one object
 */
exports.get_right = function (cookie, obj, func_name) {
		util.log("GET_RIGHT - Opening");
		var stmt = "SELECT right FROM test WHERE cookie =\"" + cookie +"\"";
		var rep;
		db.each(stmt, function (e,r) {
			if(e) {
				util.log("ERROR - SQL - GET_RIGHT function: " + e);
			} else {
				rep = r;
				util.log("rep.right = " + rep.right + " -----------------------");
			}
		}, function (err,n) {
			//console.log ("err: " + err + "\nnb lines = " + n + "\nREP: " + rep);
			obj[func_name](rep);
		});
		util.log("GET_RIGHT - Closing");
};

/**
 * \brief 21 - get_user_reg gives you the user corresponding to the input cookie_reg
 * Test OK le 17/05 
 * @param (string) cookie_reg is the temporary cookie of registration of  the user you want to identify
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with the object
 */
exports.get_user_reg = function (cookie_reg, obj, func_name) {
		util.log("GET_USER_REG - Opening");
		var stmt = "SELECT user FROM test WHERE cookie_reg =\"" + cookie_reg +"\"";
		//var art = new Array();
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - GET_USER_REG function: " + e);
			} else {
				util.inspect(r);
			}
		}, function () {
			obj[func_name](r);
		});
	util.log("GET_USER_REG - Closing");
};

/**
 * \brief 22 - Register functions will add a new user on the website DB
 * Test OK le 17/05
 * @param (string) log
 * @param (string) pw
 * @param (string) email
 * @param (INT) right
 * @param (string) name of the site
 * @param (object) this
 * @param (string) func_name 
 * @callback (boolean) calls the callback with a cookie value
 */
exports.register = function (log, pw, email, right, site, obj, func_name) {
		util.log("REGISTER - Opening");
		var cookie  = create_cookie(email);
		var stmt = "INSERT INTO test (user, password, email , cookie, right, site) VALUES ( \""+log+"\",\"" + pw + "\",\"" + email + "\",\"" + cookie + "\",\"" + right+ "\",\"" + site +"\")";		
		db.each(stmt, function (e, r) {
			if(e) {
				util.log("ERROR - SQL - REGISTER function: " + e);
			} else {
				if (r) { 
				}
			}
		}, function(err, n) {
			obj[func_name](cookie);
		});
	util.log("REGISTER - Closing");
};

/**
 * \brief 23 - get_site gives you the site corresponding to the input cookie
 * Test OK le 17/05 
 * @param (string) user owner of the site you want to identify
 * @param (object) this
 * @param (string) func_name
 * @callback (boolean) calls the callback with the name of the site
 */
exports.get_site = function (user, obj, func_name) {
		util.log("GET_SITE - Opening");
		var stmt = "SELECT site FROM test WHERE user =\"" + user +"\"";
		db.each(stmt, function (e,r) {
		if(e) {
			util.log("ERROR - SQL - GET_SITE function: " + e);
			} else {
				util.inspect(r);
			}
		}, function () {
			obj[func_name](r);
		});
	util.log("GET_SITE - Closing");
};


/**
 * \brief 99 - DEBUG fonction 
 * 
 * 
 */
read = function () {
	var stmt = "SELECT user FROM test";
    db.each(stmt, function (e, r) {
        console.log(util.inspect(r));
    });
};
