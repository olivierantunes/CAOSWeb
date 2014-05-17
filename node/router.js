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
		if (b.action == "login") {
			db.check_log(b.pseudo, b.password, _this, "cb_check_log");
			_this.resp.end();
		} else if (b.action == "register-blog" || b.action == "register-caosweb") {
			db.check_subscribe_log (b.login, b.mail, _this, "cb_check_subscribe_log");
			_this.resp.end();
		} else if (b.action == "submit article") {
			submit_article (b.author, _this, "cb_submit_article") {
			_this.resp.end();
		} else if ("confirm-registration-caosweb" == b.action) {
		
			_this.resp.end();
		} else if ("confirm-registration-blog" == b.action) {
			
			_this.resp.end();
		} else if (b.action == "get-rights") {
			db.get_rights (_this.req.headers.cookie, _this, "cb_get_rights");
			_this.resp.end();
		} else if (b.action == "get-article") {
			db.order_article (1, _this, "cb_order_article");//capture the sense of '0' or '1' for display validated articles | change name db and db functions to get_articles
			_this.resp.end();
		} else if (b.action == "get-validate") {
			db.order_article (0, _this, "cb_order_article");//capture the sense of '0' or '1' for display in wait of validation articles  | change name db and db functions to get_articles
			_this.resp.end();
		} else if (b.action == "validation-article") {
			//db function to be done
			db.update_article_status ();
			_this.resp.end();
		} else if (b.action == "delete-article") {
			db.delete_article (b.articleId, _this, "cb_delete_article");//check if b.articleId ok w/ Jean
			_this.resp.end();
		} else if (b.action == "get-members") {
			
			_this.resp.end();
		} else if (b.action == "logout") {
			db.log_out (_this.req.headers.cookie;, _this, "cb_log_out");
			_this.resp.end();
		} else {
			_this.resp.write(JSON.stringify({resp: "Service not found"}));
			_this.resp.end();
		}
    },
	
cb_check_log:
	function (resCheckLog) {
		if (resCheckLog) {
				db.assign_cookie (b.pseudo, _this, "cb_assign_cookie");
			} else {
				_this.resp.write(JSON.stringify({resp: "ko"}));
				_this.resp.end();
			}
	},
	
cb_assign_cookie:
	function (c) {
		_this.resp.writeHead(200,"ok",{"Context-Type": 'application/json', "Set-Cookie": c});
		_this.resp.write(JSON.stringify({resp: "ok"}));
		_this.resp.end();
	},

cb_check_subscribe_log:
	function (f) {
		if (f) {
			db.register (_this.b.login, _this.b.pw, _this.b.mail, cookie_reg, 0, _this, "cb_register");
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},
	
cb_register:
	function (c) {
		if (c) {
			if (_this.b.nameWebsite) {
				nodeMailer.mail_router (_this.b.mail, "noreply.caosweb@gmail.com", _this.b.login, _this.b.pw, c, "localhost:1337/ConfirmRegistration");
			} else {
				nodeMailer.mail_router (_this.b.mail, "noreply.caosweb@gmail.com", _this.b.login, _this.b.pw, c, "localhost:1337/ConfirmRegistration");
			}
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},
	
cb_submit_article:
	function (id) {
		if (id) {
			gestionArticles.submit_article (id, _this.b);
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},
	
cb_get_rights:
	function (r) {
		if (r) {
			_this.resp.write(JSON.stringify({"rights": r}));//check if '"' needed
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
		}
		_this.resp.end();
	},
	
cb_delete_article:
	function (ok) {
		if (ok) {
			gestionArticles.delete_article (_this.b.articleId);
		} else {
			_this.resp.write(JSON.stringify({resp: "ko"}));
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
	
cb_order_article:
	function (ok) {
		if (ok) {
			//rebuild json object for each article (after fetching them)
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
