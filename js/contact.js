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
	} else if (src.has_class("submit-contact")){
	
	}

};
site.submit_contact= function() {
	var e = document.getElementsByClassName("email")[0];
	var r= document.getElementsByClassName("request")[0];
	var d= document.getElementsByClassName("details")[0];
	
	var data = {action: "submit-contact", email: e, request: r, details: d};
	tools.post(data, site.cb_sub_contact);
};

site.cb_sub_contact = function () {
	if (this.readyState == 4 && this.statusCode == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			alert("Request sent");
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