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

site.cb_info = function () {
	//if (readystate) //TODO
	var info = {
		pseudo: "MmeMichu",
		email: "a@b.c",
		password: "**********",
		rights: "Administrateur"
	}
	
	var r = new Array();
	r.push(info);
	
	//ici
	
	var elt = document.getElementsByClassName("dynamic-info")[0];
	for (a in r) {
	elt.innerHTML += "pseudo :  " + r[a].pseudo + "<br></br>" +
					"email :  " + r[a].email +" <br></br>" +
					"password :  " + r[a].password + "<br></br>" +
					"Vos droits :   " + r[a].rights;
	};
};

site.cb_modify=function (){
}
site.cb_unsubscribe=function(){
}

window.onload = function () {
	setTimeout(site.on_ready, 1);
	setTimeout(site.cb_info, 500);
};

HTMLElement.prototype.has_class = function(s) {
	return (this.className.indexOf(s) >= 0);
};