var site={};

site.on_ready = function () {
	document.addEventListener("click", site.on_click);
};

site.on_click = function (ev){
	var src = ev.target;
	
	console.log("toc");
	
	if (src.has_class("go-top")){
		window.scrollTo(0,0);
	} else if (src.has_class("go-dec")) {
		var t = document.getElementById("dec");
		window.scrollTo(0, t.offsetTop);
	} else if (src.has_class("submit-art")){
	
	}

};
site.check_log= function() {
	var m = document.getElementsByClassName("email")[0];
	var pw= document.getElementsByClassName("password")[0];
	
	var data = {action: "check_log", email: m, password: pw};
	tools.post(data, site.cb_check_log);
};

site.cb_check_log = function () {
	if (this.readyState == 4 && this.statusCode == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			alert("Bien connecté");
		} else {
			alert("FAIL");
		}
	}
};
window.onload = function () {
	setTimeout(site.on_ready, 1);
};

HTMLElement.prototype.has_class = function(s) {
	return (this.className.indexOf(s) >= 0);
};