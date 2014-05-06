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
site.submit_arti= function() {
	var t = document.getElementsByClassName("title")[0];
	var a= document.getElementsByClassName("author")[0];
	var c= document.getElementsByClassName("content")[0];
	
	var data = {action: "submit-art", title: t, author: a, content: c};
	tools.post(data, site.cb_sub_art);
};

site.cb_sub_art = function () {
	if (this.readyState == 4 && this.statusCode == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			alert("article posté");
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