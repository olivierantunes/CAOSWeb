var site={};

site.on_ready = function () {
	document.addEventListener("click", site.on_click);
	site.ask_right();
};

site.ask_right = function() {
    var data ={"action": "get-rights"};
	tools.post(data, site.cb_rights);
};

site.cb_rights = function () {
	if (this.readyState == 4 && this.status == 200) {
		var right = JSON.parse(this.responseText);	
		rights=(right.role === "") ? -1 : right.role;
		var elt = document.getElementsByClassName("dynamic-rights")[0];
			if (rights == 0) {
				elt.innerHTML +="<div class=\"container\">"+
							"<ul class=\"nav nav-pills pull-left\">"+
								"<li class=\"blog-nav-item active\"><a href=\"Accueil.html\">Accueil</a></li>"+
								"<li class=\"blog-nav-item active\"><a href=\"RedigerArticle.html\">Publier</a></li>"+
								"<li class=\"blog-nav-item active\"><a href=\"ValiderArticle.html\">Valider</a></li>"+
								"<li><a href=\"gererMembres.html\">Gérer les utilisateurs</a></li>"+
							"</ul>"+
							"<ul class=\"nav nav-pills pull-right\">"+
								"<li class=\"blog-nav-item logout active\"><a href=\"Accueil.html\">Se déconnecter</a></li>"+
							"</ul>"+
						"</div>";
			} else if (rights == 1) {
				elt.innerHTML +="<div class=\"container\">"+
							"<ul class=\"nav nav-pills pull-left\">"+
								"<li class=\"blog-nav-item active\"><a href=\"Accueil.html\">Accueil</a></li>"+
								"<li class=\"blog-nav-item active\"><a href=\"RedigerArticle.html\">Publier</a></li>"+
								"<li class=\"blog-nav-item active\"><a href=\"ValiderArticle.html\">Valider</a></li>"+
								"<li><a href=\"gererMembres.html\">Gérer les utilisateurs</a></li>"+
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
								"<li class=\"blog-nav-item  logout active\">Se déconnecter</li>"+
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
		}
};

site.logout = function() {
    var data ={"action": "logout"};
	tools.post(data, site.cb_logo);
};

site.cb_logo = function () {
	if (this.readyState == 4 && this.status == 200) {
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
	if (src.has_class("submit-art")){
	site.submit_arti();
	}
	if (src.has_class("logout")){
	site.logout();
	}
};
site.submit_arti= function() {
	var t = document.getElementsByClassName("title")[0];
	var c= document.getElementsByClassName("content")[0];
	var data = {action: "submit-article", title: t.value, content: c.value};
	tools.post(data, site.cb_sub_art);
};

site.cb_sub_art = function () {
	if (this.readyState == 4 && this.status == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			alert("article posté");
			location.reload(); 
		} else {
			alert("Votre article n'a pu être posté. Veulliez ré-essayer ultérieurement s'il-vous-plait.");
		}
	}
};

window.onload = function () {
	setTimeout(site.on_ready, 1);
};
