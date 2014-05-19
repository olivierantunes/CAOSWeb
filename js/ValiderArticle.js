var site={};

site.on_ready = function () {
	document.addEventListener("click", site.on_click);
	site.ask_right();
	site.ask_validate();
};

site.ask_right = function() {
    var data ={"action": "get-rights"};
	tools.post(data, site.cb_rights);
};

site.cb_rights = function () {
	if (this.readyState == 4 && this.status == 200) {
		var right = JSON.parse(this.responseText);	
		rights=right.role;
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
		} 
		else if {
			alert("La page n'a pas pu se charger correctment. Veuillez réessayer ultèrieurument.");
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

site.ask_validate = function() {
	var data ={"action": "get-validate"};
	tools.post(data, site.cb_valid);
};

site.cb_valid = function () {
	if (this.readyState == 4 && this.status == 200) {
		var art = JSON.parse(this.responseText);	
		var elt = document.getElementsByClassName("dynamic-art")[0];
		for (a in r) {
		elt.innerHTML += "<h3 class=\"blog-post-title\" id=\"jan\">" + r[a].title + " " + a + "</h3>" +
					"<p class=\"blog-post-meta\">" + r[a].date + " par <a href=\"#\">" + r[a].author+ "</a>"+
					"<blockquote>" +
						"<p>" + r[a].content + "</p>" +
					"</blockquote>"+
					"<p class= \"ID hidden\">" + r[a].ID + "<p>"+
					"<button class=\"btn btn-success valid_article\">Valider</button>"+" "+
					"<button class=\"btn btn-danger delete_article\">Annuler</button>";
		}
	}
	else if {
		alert("Les articles n'ont pas pu se charger correctement, veuillez réessayer ultèrieureument.");
	}
};

site.valid_arti= function() {
	var art = document.getElementsByClassName("ID")[0];
	var data = {action: "validation-article", id: art};
	tools.post(data, site.cb_sub_valid);
};

site.cb_sub_valid = function () {
	if (this.readyState == 4 && this.status == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			alert("article validé");
			location.reload(); 
		} else {
			alert("Cette article n'a pu être validé. Veulliez ré-essayer ultérieurement s'il-vous-plait.");
		}
	}
};

site.delete_arti= function() {
	var art = document.getElementsByClassName("ID")[0];
	var data = {action: "delete-article", id: art};
	tools.post(data, site.cb_del_valid);
};

site.cb_del_valid = function () {
	if (this.readyState == 4 && this.status == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			alert("article supprimé");
			location.reload(); 
		} else {
			alert("Cette article n'a pu être supprimé. Veulliez ré-essayer ultérieurement s'il-vous-plait.");
		}
	}
};

site.on_click = function (ev){
	var src = ev.target;
	console.log("toc");
	if (src.has_class("valid_article")){
	site.valid.arti();
	}
	else if (src.has_class("delete_article")){
	site.delte_arti();
	}
	else if (src.has_class("logout")){
	site.logout();
	}
};

window.onload = function () {
	setTimeout(site.on_ready, 1);
};