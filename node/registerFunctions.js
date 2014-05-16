var util = require("util");
var url = require("url");
var fs = require("fs");
require("./styles.js").add_theme();
var db = require("./bdd_js.js");
var nodeMailer = require("./nodeMailer.js");
	
var senderAddress = "noreply.caosweb@gmail.com";

/**
 * This function 
 * @param b (JSON object): 
 * @return (String): "ok" or "ko"
 */
exports.register_blog:
		function (b) {
			var userTemporaryId = db.create_ID (b.pseudo);
			
			db.register (b.pseudo, b.password, b.email, b.nameWebsite, userTemporaryId, right, this, "register");
			
			mail_router (b.email, senderAddress, b.pseudo, b.password, userTemporaryId, b.nameWebsite);
		},
		
/**
 * This function 
 * @param b (JSON object): 
 * @return (String): "ok" or "ko"
 */
exports.confirm_registration_blog:
		function () {
			
		},
		
/**
 * This function 
 * @param b (JSON object): 
 * @return (String): "ok" or "ko"
 */
exports.register_caosweb:
		function (b) {
			var userTemporaryId = db.create_ID (b.pseudo);
			
			db.register (b.pseudo, b.password, b.email, userTemporaryId, right, this, "register");
			
			//mail_router (b.email, senderAddress, b.pseudo, b.password, userTemporaryId, nameWebsite);
		}
		
/**
 * This function 
 * @param b (JSON object): 
 * @return (String): "ok" or "ko"
 */
exports.confirm_registration_caosweb:
		function (id) {
			//update user through id
		},
