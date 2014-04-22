var connect = {};

connect.start = function () {
	document.addEventListener("click", connect.on_click);
};

connect.on_click = function (ev) {
	var src = ev.target;
	if (src.has_class("connect-submit")) {
		connect.submit_login();
	}
};

connect.submit_login = function () {
	var log = document.getElementsByClassName("connect-login")[0].value;
	var pw = document.getElementsByClassName("connect-password")[0].value;
	var data = {action: "login", login: log, password: pw};
	connect.post(data, connect.cb_login);
};

connect.cb_login = function () {
	if (this.readyState == 4 && this.status == 200) {
		var r = JSON.parse(this.responseText);
		console.log(r);
		if (r.resp == "ok") {
			window.location = "/index.html";
		}
	}
};

connect.post = function (data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.onreadystatechange = callback;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
};

HTMLElement.prototype.has_class = function (c) {
	return (this.className.indexOf(c) >= 0);
};

window.onload = function () {
	setTimeout(connect.start, 1);
};