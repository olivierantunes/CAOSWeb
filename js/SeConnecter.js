var site={};

site.on_ready = function () {
	document.addEventListener("click", site.on_click);
	site.cb_rights();
	site.check_login();
};

site.ask_right = function() {
    var data ={"action": "get_rights"};
	tools.post(data, site.cb_rights);
};

site.cb_rights = function () {
	//if (readystate) //TODO
	var rights = 1; //JSON.parse(this.responseText);
	//right=rights.role;
	var elt = document.getElementsByClassName("dynamic-rights")[0];
	if (rights == 0) {
	elt.innerHTML +="<div class=\"container\">"+
						"<ul class=\"nav nav-pills pull-left\">"+
							"<li class=\"blog-nav-item active\"><a href=\"Accueil.html\">Accueil</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"RedigerArticle.html\">Publier</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"ValiderArticle.html\">Valider</a></li>"+
							"<li class=\"dropdown blog-nav-item active\">"+
								"<a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">Admin<b class=\"caret\"></b></a>"+
								"<ul class=\"dropdown-menu\">"+
									"<li><a href=\"gererMembres.html\">Gérer les utilisateurs</a></li>"+
									"<li><a href=\"changerForme.html\">Changer la forme</a></li>"+
								"</ul>"+
							"</li>"+
						"</ul>"+
						"<ul class=\"nav nav-pills pull-right\">"+
							"<li class=\"blog-nav-item logout active\"><a href=\"Accueil.html\">Se déconnecter</a></li>"+
						"</ul>"+
					"</div>";
	}
	else if (rights == 1) {
	elt.innerHTML +="<div class=\"container\">"+
						"<ul class=\"nav nav-pills pull-left\">"+
							"<li class=\"blog-nav-item active\"><a href=\"Accueil.html\">Accueil</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"RedigerArticle.html\">Publier</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"ValiderArticle.html\">Valider</a></li>"+
							"<li class=\"dropdown blog-nav-item active\">"+
								"<a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">Admin<b class=\"caret\"></b></a>"+
								"<ul class=\"dropdown-menu\">"+
									"<li><a href=\"gererMembres.html\">Gérer les utilisateurs</a></li>"+
									"<li><a href=\"changerForme.html\">Changer la forme</a></li>"+
								"</ul>"+
							"</li>"+
						"</ul>"+
						"<ul class=\"nav nav-pills pull-right\">"+
							"<li class=\"blog-nav-item logout active\"><a href=\"Accueil.html\">Se déconnecter</a></li>"+
						"</ul>"+
					"</div>";
	}
	else if (rights == 2) {
	elt.innerHTML +="<div class=\"container\">"+
						"<ul class=\"nav nav-pills pull-left\">"+
							"<li class=\"blog-nav-item active\"><a href=\"Accueil.html\">Accueil</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"RedigerArticle.html\">Publier</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"ValiderArticle.html\">Valider</a></li>"+
						"</ul>"+
						"<ul class=\"nav nav-pills pull-right\">"+
							"<li class=\"blog-nav-item logout active\"><a href=\"Accueil.html\">Se déconnecter</a></li>"+
						"</ul>"+
					"</div>";
	}
	else if (rights == 3) {
	elt.innerHTML +="<div class=\"container\">"+
						"<ul class=\"nav nav-pills pull-left\">"+
							"<li class=\"blog-nav-item active\"><a href=\"Accueil.html\">Accueil</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"RedigerArticle.html\">Publier</a></li>"+
						"</ul>"+
						"<ul class=\"nav nav-pills pull-right\">"+
							"<li class=\"blog-nav-item logout active\"><a href=\"Accueil.html\">Se déconnecter</a></li>"+
						"</ul>"+
					"</div>";
	}
	else if (rights == 4) {
	elt.innerHTML +="<div class=\"container\">"+
						"<ul class=\"nav nav-pills pull-left\">"+
							"<li class=\"blog-nav-item active\"><a href=\"Accueil.html\">Accueil</a></li>"+
						"</ul>"+
						"<ul class=\"nav nav-pills pull-right\">"+
							"<li class=\"blog-nav-item  logout active\"><a href=\"Accueil.html\">Se déconnecter</a></li>"+
						"</ul>"+
					"</div>";
	}
	else {
	elt.innerHTML +="<div class=\"container\">"+
						"<ul class=\"nav nav-pills pull-left\">"+
							"<li class=\"blog-nav-item active\"><a href=\"Accueil.html\">Accueil</a></li>"+
						"</ul>"+
						"<ul class=\"nav nav-pills pull-right\">"+
							"<li class=\"blog-nav-item active\"><a href=\"Sinscrire.html\">S'incrire</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"SeConnecter.html\">Se connecter</a></li>"+
						"</ul>"+
					"</div>";
	}
};

site.logout = function() {
    var data ={"action": "logout"};
	tools.post(data, site.cb_logo);
};

site.cb_logo = function () {
	if (this.readyState == 4 && this.statusCode == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			alert("Vous êtes bien déconnecté");
			location.assign("Accueil.html");
		} else {
			alert("Vous n'avez pas pu être déconnecté. Veulliez ré-essayer ultérieurement s'il-vous-plait.");
		}
	}
};

site.on_click = function (ev){
	var src = ev.target;
	console.log("toc");
	if (src.has_class("check_log")){
	site.check_login
	}
	if (src.has_class("logout")){
	site.logout();
	}
};
site.check_login= function() {
	var m = document.getElementsByClassName("email")[0];
	var pw= document.getElementsByClassName("password")[0];
	var data = {action: "login", mail: m, password: pw};
	tools.post(data, site.cb_check_log);
};

site.cb_check_log = function () {
	if (this.readyState == 4 && this.statusCode == 200) {
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
