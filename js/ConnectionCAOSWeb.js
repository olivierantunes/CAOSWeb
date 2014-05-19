var site={};

site.on_ready = function () {
	document.addEventListener("click", site.on_click);
};

site.on_click = function (ev){
	var src = ev.target;
	console.log("toc");
	if (src.has_class("connectionCAOSWeb")){
	site.check_login();
	}
};
site.check_login= function() {
	var m = document.getElementsByClassName("login")[0];
	var pw= document.getElementsByClassName("pass")[0];
	var data = {action: "login", mail: m.value, password: pw.value};
	tools.post(data, site.cb_check_logCAOSWeb);
};

site.cb_check_logCAOSWeb = function () {
	if (this.readyState == 4 && this.status == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			alert("Vous êtes bien connecté");
			location.assign("Accueil.html");
		} else {
			alert("Vous n'avez pas pu être connecté. Veuillez reessayer où vous inscrire d'abord.");
		}
	}
};
window.onload = function () {
	setTimeout(site.on_ready, 1);
};
