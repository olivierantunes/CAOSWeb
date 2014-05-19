var util = require("util");
var url = require("url");
var fs = require("fs");
require("./styles.js").add_theme();
var db = require("./bdd_js.js");
var artManage = require("./gestionArticles.js");
var regFcts = require("./registerFunctions.js");

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
			util.log("post_method -> echangeur");
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
		this.buffer = b;
		_this.resp.writeHead(200, {"Content-Type": "application/json"});
		if (b.action == "login") {//checked
			db.check_log(b.pseudo, b.password, _this, "cb_check_log");
			_this.resp.end();
		} else if (b.action == "register-blog") {//checked
			db.check_subscribe_log (b.login, b.mail, _this, "cb_check_subscribe_log_blog");
			_this.resp.end();
		} else if (b.action == "register-caosweb") {//checked
			db.check_subscribe_log (b.login, b.mail, _this, "cb_check_subscribe_log_caosweb");
			_this.resp.end();
		}else if (b.action == "submit article") {//checked
			db.submit_article (b.author, _this, "cb_submit_article");
			_this.resp.end();
		} else if ("confirm-registration-caosweb" == b.action) {
			db.get_user_reg(b.id, _this, "cb_confirm_registration_caosweb");
			_this.resp.end();
		} else if ("confirm-registration-blog" == b.action) {//checked
			db.get_user_reg(b.id, _this, "cb_confirm_registration_blog");
			_this.resp.end();
		} else if (b.action == "get-rights") {//checked
			db.get_right (_this.req.headers.cookie, _this, "cb_get_rights");
			_this.resp.end();
		} else if (b.action == "get-article") {//checked
			db.order_article (1, _this, "cb_order_article");
			_this.resp.end();
		} else if (b.action == "get-validate") {//checked
			db.order_article (0, _this, "cb_order_article");
			_this.resp.end();
		} else if (b.action == "validation-article") {//checked
			db.update_article_status (b.articleId, _this, "cb_update_article_status");
			_this.resp.end();
		} else if (b.action == "delete-article") {//checked
			db.delete_article (b.articleId, _this, "cb_delete_article");
			_this.resp.end();
		} else if (b.action == "get-members") {//checked
			db.users_list (_this, "cb_users_list") {
			_this.resp.end();
		} else if (b.action == "logout") {//checked
			db.log_out (_this.req.headers.cookie, _this, "cb_log_out");
			_this.resp.end();
		} else {
			_this.resp.write(JSON.stringify({resp: "Service not found"}));
			_this.resp.end();
		}
    },
	
cb_check_log:
	function (resCheckLog) {
		if (resCheckLog) {
				db.assign_cookie (_this.buffer.pseudo, _this, "cb_assign_cookie");
			} else {
				_this.resp.write(JSON.stringify({resp: "ko"}));
				_this.resp.end();
			}
	},
	
cb_assign_cookie:
	function (c) {
		_this.resp.writeHead(200,"ok",{"Context-Type": 'application/json', "Set-Cookie": c});
		_this.resp.write(JSON.stringify({resp: "ok"}));
		util.log("log in complete | cookie assigned");
		_this.resp.end();
	},

cb_check_subscribe_log_blog:
	function (ko) {
		if (ko) {
			db.register_blog (_this.buffer.login, _this.buffer..pw, _this.buffer.mail, 0, _this, "cb_register");
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},
	
cb_check_subscribe_log_caosweb:
	function (ko) {
		if (ko) {
			db.register (_this.buffer.login, _this.buffer.pw, _this.buffer.mail, 0, _this.buffer.siteName, _this, "cb_register");
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},
	
cb_register:
	function (c_r) {
		if (c_r) {
			if (_this.b.nameWebsite) {
				nodeMailer.mail_router (_this.buffer.mail, "noreply.caosweb@gmail.com", _this.buffer.login, _this.buffer.pw, c_r, "localhost:1337/ConfirmRegistrationCaos");
			} else {
				nodeMailer.mail_router (_this.buffer.mail, "noreply.caosweb@gmail.com", _this.buffer.login, _this.buffer.pw, c_r, "localhost:1337/ConfirmRegistration");
			}
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},
	
cb_confirm_registration_caosweb:
	function (user) {
		if (user) {
			//db.get_site ();//= function (cookie_reg, obj, func_name) --> change into 
			db.assign_cookie (user, _this, "cb_assign_cookie");	
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},
	
cb_confirm_registration_blog:
	function (user) {
		if (user) {
			db.assign_cookie (user, _this, "cb_assign_cookie");	
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},
	
cb_submit_article:
	function (id) {
		if (id) {
			gestionArticles.push_article_db(id, _this.buffer, "cb_push_article_db");
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},
	
cb_push_article_db:
	function (dirPath, id, b) {
		if (id) {
			gestionArticles.push_content(dirPath, id, b, "cb_push_content");
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},
	
cb_push_content:
	function (ok) {
		if (ok) {
			_this.resp.write(JSON.stringify({resp: "ok"}));
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},

cb_delete_article:
	function (ok) {
		if (ok) {
			gestionArticles.delete_article(b.articleId);
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},
	
cb_update_article_status:
	function (ok) {
		if (ok) {
			_this.resp.write(JSON.stringify({resp: "ok"}));
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},
	
cb_order_article:
	function (a) {
		if (a) {
			gestionArticles.load_articles (a, _this, "cb_send_articles");
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},
	
cb_send_articles:
	function (a) {
		if (a) {
			_this.resp.write(JSON.stringify({"articles": a}));
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},
	
cb_get_rights:
	function (r) {
		if (r) {
			_this.resp.write(JSON.stringify({"rights": r}));
		} else {
			_this.resp.write(JSON.stringify({"rights": ""}));
		}
		_this.resp.end();
	},	
	
cb_log_out:
	function (ok) {
		if (ok) {
			_this.resp.write(JSON.stringify({resp: "ok"}));
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},
	
cb_ursers_list:
	function (a) {
		if (a) {
			_this.resp.write(JSON.stringify({resp: a}));
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
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
