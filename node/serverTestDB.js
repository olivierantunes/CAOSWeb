var http = require("http");
var util = require("util");
var db = {}; //Server object. This object is use to stock everything owned by the server.
db.r = require("./bdd_js.js");
db.port = 1337;
db.address = "127.0.0.1";

/**
 * This method is called each times a request arrives on the server
 * @param req (Object) request object for this request
 * @param resp (Object) response object for this request
 */
db.receive_request = function (req, resp) {
    db.r.allRead(req, resp);
};

http.createServer(db.receive_request).listen(db.port, db.address);
		
util.log("INFO - Server started, listening " + db.address + ":" + db.port);
