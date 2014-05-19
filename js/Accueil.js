var site={};

site.on_ready = function () {
	document.addEventListener("click", site.on_click);
	site.ask_right();
	site.ask_article();
};

site.ask_right = function() {
    var data ={"action": "get-rights"};
	console.log("ask_right");//added by loic
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

site.on_click = function (ev){
	var src = ev.target;
	console.log("toc");
	if (src.has_class("logout")){
	site.logout();
	}
};

site.ask_article = function() {
	var data ={action: "get-article"};
	tools.post(data, site.cb_art);
};

site.cb_art = function () {
	if (this.readyState == 4 && this.status == 200) {
		var art = JSON.parse(this.responseText);	
		var elt = document.getElementsByClassName("dynamic-art")[0];
		for (a in r) {
		elt.innerHTML += "<h3 class=\"blog-post-title\" id=\"jan\">" + r[a].title + " " + a + "</h3>" +
						"<p class=\"blog-post-meta\">" + r[a].date + " par <a href=\"#\">" + r[a].author + "</a><button id=\"delete\" name=\"button1id\" class=\"btn btn-danger pull-right\"><span class=\"glyphicon glyphicon-trash\"></span></button></p>" +
						"<blockquote>" +
							"<p>" + r[a].content + "</p>" +
						"</blockquote>";
		}
	}
	else if {
		alert("Les articles n'ont pas pu se charger correctement, veuillez réessayer ultèrieureument.");
	}
};


window.onload = function () {
	setTimeout(site.on_ready, 1);
	setTimeout(site.cb_art, 1000);
};
