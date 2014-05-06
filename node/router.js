var util = require("util");
var url = require("url");
var fs = require("fs");
require("./styles.js").add_theme();

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
        util.log("ERROR - A srouter object need a request and a response object");
        return;
    }
};

srouter.prototype = {
run:
    function () {
        this.rest_method();
    },

rest_method:
    function () {
        if (this.req.method == "GET") {
            this.get_method();
		} else if (this.req.method == "POST") {
			this.post_method();
        } else {
            this.resp.writeHead(501, {"Content-Type": "application/json"});
            this.resp.write(JSON.stringify({message: "Not Implemented"}));
            this.resp.end();
			return;
        }
    },
	
post_method:
    function () {
        var _this = this;
        var buff = "";
        this.req.on("data", function (c) {
            buff += c;
        });
        this.req.on("end", function () {
            _this.go_post(buff);
        });
    },

/**
 * This function feeds the action functions with any event 
 * @param b (String) : 
 * @return (Str) : "Service not found"
 */
go_post:
    function (b) {
        b = JSON.parse(b);
		this.resp.writeHead(200, {"Content-Type": "application/json"});
		if (b.action == "log in") {
			var returnCheckLog = checkLog (b.login, b.pw, this, "cb_checkLog");
		} else if (b.action == "register") {
			var returnRegister = subscribe (b.login, b.pw, this, "cb_subscribe");
		} else if (b.action == "submitArticle") {
			var returnSubmitArticle = submitArticle (b.articleStatus, this, "cb_submitArticle");
		} else {
			this.resp.write(JSON.stringify({resp: "Service not found"}));
		}
        this.resp.end();
    },
	
/**
 * This function replies to the log in event
 * @param f (Int) : flag of registration succeeding 1 or 0
 * @return (Str) : "ok" or "ko"
 */
cb_login:
	function (f) {
		if (f) {
			this.resp.write(JSON.stringify({resp: "ok"}));
		} else {
			this.resp.write(JSON.stringify({resp: "ko"}));
		}
		this.resp.end();
	},

/**
 * This function replies to the registration event
 * @param f (Int) : flag of registration succeeding 1 or 0
 * @return (Str) : "ok" or "ko"
 */
cb_subscribe:
	function (f) {
		if (f) {
			this.resp.write(JSON.stringify({resp: "ok"}));
		} else {
			this.resp.write(JSON.stringify({resp: "ko"}));
		}
		this.resp.end();
	},
	
/**
 * This function replies to the article submission event
 * @param f (Int) : flag of registration succeeding 1 or 0
 * @return (Str) : "ok" or "ko"
 */
cb_submitArticle:
	function (f) {
		if (f) {
			this.resp.write(JSON.stringify({resp: "ok"}));
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
