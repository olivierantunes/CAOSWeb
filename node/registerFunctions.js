var util = require("util");
var url = require("url");
var fs = require("fs");
require("./styles.js").add_theme();
var db = require("./bdd_js.js");
var nodeMailer = require("./nodeMailer.js");
	
/**
 * This function orders the operations to push an article in the db
 * @param b (JSON object): 
 * @return (String): "ok" or "ko"
 */
exports.register_blog:
		function (b) {
			var userTemporaryId = db.create_ID (b.pseudo);
			
			db.register (b.pseudo, b.password, b.email, userTemporaryId, right, this, "register");
			
			nodeMailer.mailRouter (b.email, b.pseudo, b.password, userTemporaryId);
		},
		
/**
 * This function orders the operations to push an article in the db
 * @param b (JSON object): 
 * @return (String): "ok" or "ko"
 */
exports.register_caosweb:
		function (b) {
			
		},