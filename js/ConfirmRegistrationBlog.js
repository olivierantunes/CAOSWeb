var confirmRegistration = {};

site.ask_right = function() {
    var data ={"action": "get_rights"};
	tools.post(data, site.cb_rights);
};

site.cb_rights = function () {
	if (this.readyState == 4 && this.statusCode == 200) {
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

confirmRegistration.on_ready = function () {
	document.addEventListener("click", confirmRegistration.on_click);
	confirmRegistration.cb_rights();
};

confirmRegistration.on_click = function (ev){
	var src = ev.target;
	if (src.has_class("go_site")){
		confirmRegistration.gosite();
	}
};

var getid = function (cb){
	var data = {action: "get_id"};
	tools.post(data, cb);
};

confirmRegistration.sendID=function () {
	//RESPONSE TEXT
	var data = {action: "confirm-registration-CAOSWeb", ID: idsite};
	tools.post(data, site.cb_reg_blog);
};

confirmRegistration.cd_reg_blog = function () {
	if (this.readyState == 4 && this.statusCode == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			has_class("go_site").add_href("localhost:" + r.id_site);// rajouter au bouton "go site" href du nom de domaine.
		} 
		else {
			alert("Votre confirmation n'as pas pu être prise en compte, veuillez réessayer ultérieurement.");
		}
	}
};

confirmRegistration.gosite=function(){
	add_href(getid());
};

window.onload = function () {
	setTimeout(confirmRegistration.on_ready, 1);
};

HTMLElement.prototype.add_class = function(cl) {
	this.className += " " + cl;
};

HTMLElement.prototype.remove_class = function (cl) {
	var b = new RegExp(cl, "g");
	this.className = this.className.replace(b, "");
};