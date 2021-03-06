var util = require("util");
var url = require("url");
var fs = require("fs");
require("./styles.js").add_theme();
var db = require("./bdd_js.js");
var gestionArticles = require("./gestionArticles.js");
var nodeMailer = require ("./nodeMailer.js");

var dirName = './article/';

/**
 * This method is used to process the request
 * @param req (Object) the request object
 * @param resp (Object) the response object
 */
exports.router = function (req, resp) {
    var inc_request = new srouter(req, resp);
    inc_request.run();
    inc_request = null;
};

/**
 * This is the parameted constructor of a srouter
 * @param req (Object) the request object 
 * @param resp (Object) the response object
 */
srouter = function (req, resp) {
    if (req && resp) {
        this.req = req;
        this.resp = resp;
        this.pathname = "";
        this.filetype = "";
        this.path = "";
		this.image_file = "jpg png jpeg bmp gif";
    } else {
        util.log("ERROR - A srouter object needs a request and a response object");
        return;
    }
};

srouter.prototype = {
run:
    function () {
        this.rest_method();
    },

/**
 * This function selects the GET or POST methods to apply
 */
rest_method:
    function () {
        if (this.req.method == "GET") {
			this.get_method();
		} else if (this.req.method == "POST") {
			util.log("post call");
			this.post_method();
        } else {
            this.resp.writeHead(501, {"Content-Type": "application/json"});
            this.resp.write(JSON.stringify({message: "Not Implemented"}));
            this.resp.end();
			return;
        }
    },

/**
 * This function feeds the exchanger with input data
 * @return null
 */
post_method:
    function () {
        var _this = this;
        var buff = "";
        this.req.on("data", function (c) {
            buff += c;
        });
        this.req.on("end", function () {
			util.log("\n\n\n\n\npost_method -> routeur");
            _this.go_post(buff);
        });
    },

/**
 * This function (exchanger) feeds the action functions with any event (= exchanger)
 * @param b (String) : buffer
 * @return (Str) : "Service not found"
 */
go_post:
    function (b) {
		var _this = this;		
        b = JSON.parse(b);
		console.log("\nb.action: " + b.action);
		this.buffer = b;
		console.log(util.inspect(b));
		_this.resp.writeHead(200, {"Content-Type": "application/json"});
		if (b.action == "login") {
			util.log("----------------------------------------------------------mail: " + b.mail);
			db.check_log(b.mail, b.password, _this, "cb_check_log");
		} else if (b.action == "get-user-site") {
			util.log("get-user-site");
			_this.resp.write(JSON.stringify({resp: "nameSite to be returned"}));
			_this.resp.end();
		} else if (b.action == "register-blog") {
			util.log("ACTIIOOOOOOOOOOOOOOOOOOOOONNNN: register-blog");
			db.check_subscribe_log (b.login, b.mail, _this, "cb_check_subscribe_log_blog");
		} else if (b.action == "register-caosweb") {
			util.log("register-caosweb");
			db.check_subscribe_log (b.login, b.email, _this, "cb_check_subscribe_log_caosweb");
		}else if (b.action == "submit-article") {
			util.log("SUBMIT_ARTICLE");
			db.get_user (_this.req.headers.cookie, _this, "cb_get_user")
		} else if ("confirm-registration-caosweb" == b.action) {
			util.log("confirm-registration-caosweb");
			db.get_user_reg(b.id, _this, "cb_confirm_registration_caosweb");
		} else if ("confirm-registration-blog" == b.action) {
			util.log("confirm-registration-blog");
			db.get_user_reg(b.id, _this, "cb_confirm_registration_blog");
		} else if (b.action == "get-rights") {
			util.log("get-rights");
			console.log("_this.req.headers.coOOOOOOOOOOOOOOokie = " + _this.req.headers.cookie);
			db.get_right(_this.req.headers.cookie, _this, "cb_get_rights");
		} else if (b.action == "get-article") {
			util.log("get-article");
			db.order_article (1, _this, "cb_order_article");
		} else if (b.action == "get-validate") {
			util.log("get-validate");
			db.order_article (0, _this, "cb_order_article");
		} else if (b.action == "validation-article") {
			util.log("validation-article");
			db.update_article_status (b.articleId, _this, "cb_update_article_status");
		} else if (b.action == "delete-article") {
			util.log("delete-article");
			db.delete_article (b.articleId, _this, "cb_delete_article");
		} else if (b.action == "get-members") {
			util.log("get-members");
			db.users_list (_this, "cb_users_list");
		} else if (b.action == "logout") {
			util.log("LOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUTLOGOUT");
			console.log("_this.req.headers.cookie = " + _this.req.headers.cookie);
			db.log_out (_this.req.headers.cookie, _this, "cb_log_out");
		} else {
			_this.resp.write(JSON.stringify({resp: "Service not found"}));
			_this.resp.end();
		}
    },
	
cb_check_log:
	function (ok) {
		if (ok) {
				console.log("this.buffer.mail = " + this.buffer.mail);
				db.assign_cookie (this.buffer.mail, this, "cb_assign_cookie");
			} else {
				console.log("TEST COOKIE FAIL");
				this.resp.write(JSON.stringify({resp: "ko"}));
				this.resp.end();
			}
	},
	
cb_assign_cookie:
	function (c) {
		console.log("ASSIGN_COOKIE\ncookie = " + c);
		//this.resp.writeHead(200,"ok",{"Context-Type": 'application/json', "Set-Cookie": c});
		this.resp.writeHead(200,{"Context-Type": 'application/json', "Set-Cookie": c});
		util.log("log in complete | cookie assigned");
		console.log("this.req.headers.cookie = " + c);
		this.resp.write(JSON.stringify({resp: "ok"}));
		this.resp.end();
	},

cb_check_subscribe_log_blog:
	function (ok) {
		if (ok) {
			this.resp.write(JSON.stringify({resp: "ko"}));
			this.resp.end();
		} else {
			db.register_blog(this.buffer.login, this.buffer.password, this.buffer.email, 4, this, "cb_register");
		}
	},
	
cb_check_subscribe_log_caosweb:
	function (ok) {
		if (ok) {
			this.resp.write(JSON.stringify({resp: "ko"}));
			this.resp.end();
		} else {
			db.register(this.buffer.login, this.buffer.password, this.buffer.email, 0, this.buffer.site_name, this, "cb_register");
		}
	},
	
cb_register:
	function (c) {
		if (c) {
			if (this.buffer.siteName) {
				nodeMailer.mail_router (this.buffer.email, "noreply.caosweb@gmail.com", this.buffer.login, this.buffer.password, c, "localhost:1337/ConfirmRegistrationCaos");
				db.check_log(this.buffer.login, this.buffer.password, _this, "cb_check_log");
				//this.resp.write(JSON.stringify({"site": this.buffer.siteName}));
			} else {
				nodeMailer.mail_router (this.buffer.email, "noreply.caosweb@gmail.com", this.buffer.login, this.buffer.password, c, "localhost:1337/ConfirmRegistration");
				this.resp.write(JSON.stringify({resp: "ok"}));
			}
			this.resp.end();
		} else {
			this.resp.write(JSON.stringify({resp: "ko"}));
			this.resp.end();
		}
	},
	
cb_confirm_registration_caosweb:
	function (user) {
		if (user) {
			db.get_site (user, this, "cb_get_site");
		} else {
			this.resp.write(JSON.stringify({resp: "ko"}));
			this.resp.end();
		}
	},
	
cb_get_site:
	function (site) {
		if (site) {
			this.resp.write(JSON.stringify({"nameSite": site}));
		} else {
			this.resp.write(JSON.stringify({resp: "ko"}));
		}
		this.resp.end();
	},
	
cb_confirm_registration_blog:
	function (user) {
		if (user) {
			db.assign_cookie (user, this, "cb_assign_cookie");	
		} else {
			this.resp.write(JSON.stringify({resp: "ko"}));
			this.resp.end();
		}
	},
	
cb_get_user:
	function (u) {
		if (u) {
			db.submit_article (u.user, this, "cb_submit_article");
		} else {
			this.resp.write(JSON.stringify({resp: "ko"}));
			this.resp.end();
		}
	},
	
cb_submit_article:
	function (id) {
		if (id) {
			gestionArticles.push_article_db(id, this, "cb_push_article_db");
		} else {
			this.resp.write(JSON.stringify({resp: "ko"}));
			this.resp.end();
		}
	},
	
cb_push_article_db:
	function (dirPath, id) {
		if (id) {
			gestionArticles.push_content(dirPath, id, this.buffer, this, "cb_push_content");
		} else {
			this.resp.write(JSON.stringify({resp: "ko"}));
			this.resp.end();
		}
	},
	
cb_push_content:
	function (ok) {
		if (ok) {
			this.resp.write(JSON.stringify({resp: "ok"}));
		} else {
			this.resp.write(JSON.stringify({resp: "ko"}));
		}
		this.resp.end();
	},

cb_delete_article:
	function (ok) {
		if (ok) {
			gestionArticles.delete_article(this.buffer.articleId);
		} else {
			this.resp.write(JSON.stringify({resp: "ko"}));
			this.resp.end();
		}
	},
	
cb_update_article_status:
	function (ok) {
		if (ok) {
			this.resp.write(JSON.stringify({resp: "ok"}));
		} else {
			this.resp.write(JSON.stringify({resp: "ko"}));
		}
		this.resp.end();
	},
	
cb_order_article:
	function (a) {
		if (a || a instanceof Array) {
			console.log("UTIL.INSPECT(a): " + util.inspect(a));
			gestionArticles.load_articles (a, this, "cb_send_articles");
		} else {
			this.resp.write(JSON.stringify({resp: "ko"}));
			this.resp.end();
		}
	},
	
cb_send_articles:
	function (a) {
		if (a || typeof a == "Array" && a.length != 0) {
			console.log("AAAAAAAAAAAAA: " + a);
			this.resp.write(JSON.stringify({"articles": a}));
		} else {
			this.resp.write(JSON.stringify({resp: "ko"}));
		}
		this.resp.end();
	},
	
cb_get_rights:
	function (r) {
		if (r) {
			this.resp.write(JSON.stringify({"role": r.right}));
		} else {
			this.resp.write(JSON.stringify({"role": ""}));
		}
		this.resp.end();
	},	
	
cb_log_out:
	function (ok) {
		if (!ok) {
			this.resp.write(JSON.stringify({resp: "ok"}));
		} else {
			this.resp.write(JSON.stringify({resp: "ko"}));
		}
		this.resp.end();
	},
	
cb_users_list:
	function (a) {
		if (a && 0 != a.length) {
			//this.resp.write(JSON.stringify({resp: a}));
			this.resp.write(JSON.stringify(a));
		} else {
			this.resp.write(JSON.stringify({resp: "ko"}));
		}
		this.resp.end();
	},
	
get_method:
    function () {
        var u = url.parse(this.req.url, true, true);
        var regexp = new RegExp("[/]+", "g");
        this.pathname = u.pathname.split(regexp);
        this.pathname = this.pathname.splice(1, this.pathname.length - 1);
        this.filetype = this.pathname[this.pathname.length - 1].split(".");
		this.filetype = this.filetype[this.filetype.length - 1];
        this.path = ".." + u.path; //the website is one directory upper the node server
        this.read_file();
    },

read_file:
    function () {
        if (!this.pathname[0]) {
            //util.log("ALERT - Hack attempt, request on : " + util.inspect(this.pathname));
            this.pathname = "../index.html";
            this.path = "../index.html";
            this.filetype = "html";
        }
        this.load_file();
    },

load_file:
    function () {
        var _this = this;
        fs.exists(this.path, function (ex) {
            if (ex) {
                fs.readFile(_this.path, function (e, d) {
                    if (e) {
                        util.log("ERROR - Problem reading file : " + e);
                    } else {
                        _this.file = d;
                        _this.file_processing();
                    }
                });
            } else {
                util.log("INFO - File requested not found : ".lblue + _this.path);
                _this.resp.writeHead(404, {"Content-Type": "text/html"});
                _this.resp.end();
            }
        });
    },

file_processing:
    function () {
        if (this.filetype == "htm") {
            this.resp.writeHead(200, { "Content-Type" : "text/html"});
        } else if (this.image_file.indexOf(this.filetype) >= 0) {
            this.resp.writeHead(200, { "Content-Type" : "image/" + this.filetype });
        } else { 
            this.resp.writeHead(200, { "Content-Type" : "text/" + this.filetype });
        }
        this.file_send();
    },

file_send:
    function () {
        this.resp.write(this.file);
        this.resp.end();
    }
};
