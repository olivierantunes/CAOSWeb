/**
 * @author Olivier ANTUNES
 *  
 *
 */

 /**
 * \author {Olivier ANTUNES, Loic PLARD, Jean GERVOSON}
 * \date may 2014
 * \version 0.1
 * \brief This function initialise a DB to use this.
 * \details This file includes a function wich will initialise the DB to be used by CAOSWeb
 * 
 * The DB contains next fields
 * user TEXT PRIMARY KEY,
 * password TEXT,
 * email TEXT 
 * articleID INT,
 * articleStatus VARCHAR(10),
 * cookie TEXT
 * right INT
 *  
 */
 
 // TODO: Date de validation
 // TODO: auteur d'article
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./test.db"); //TODO : change the name of db file for the final version
var util = require("util");

var db_co = {};

/**
 * This function create the a DB
 * The file is named test.db
 * TODO: Change the name test.db
 */
db_co.create = function () {
	util.log("CREATE - Opening"); //TODO: delete commentary in final version
	db.run("CREATE TABLE test (user TEXT PRIMARY KEY, password TEXT, email TEXT, articleID INT, articleStatus VARCHAR(10), cookie TEXT, right INT)");
	util.log("CREATE - Closing");
};
