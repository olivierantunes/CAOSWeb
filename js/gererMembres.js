var site={};

site.on_ready = function () {
	document.addEventListener("click", site.on_click);
	site.ask_right();
	site.members();
};

site.on_click = function (ev){
	var src = ev.target;
	console.log("toc");
	if (src.has_class("delete-member")){
	site.delete_member();
	}
	else if (src.has_class("validate-new-right")){
	site.modify_r();
	}
	else if (src.has_class("logout")){
	site.logout();
	}
};

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

site.members = function() {
    var data ={"action": "get_members"};
	tools.post(data, site.cb_members);
};

site.rights_match = {
	0:"Super-Administrateur",
	1:"Administrateur",
	2:"Modérateur",
	3:"Rédacteur",
	4:"Utilisateur"
};

site.cb_membres = function () {
	if (this.readyState == 4 && this.statusCode == 200) {
		var membre = JSON.parse(this.responseText);	
		var elt = document.getElementsByClassName("dynamic-membres")[0];
		for (a in r) {
			var tac = "";
			if (r[a].rights) {
				tac = "<button class=\"btn delete-member btn-danger\"><span class=\"glyphicon glyphicon-trash\"></span></button>";
			}
			r[a].rights = site.rights_match[r[a].rights];
			elt.innerHTML += 	"<tr>"+
						"<td>"+r[a].login+"</td>"+
						"<td>"+r[a].mail+"</td>"+
						"<td>"+r[a].rights+"</td>"+
						"<td><select class=\"input-xlarge new_right\">"+
						"<option> </option><option>1</option><option>2</option><option>3</option><option>4</option></select>"+
						"<button class=\"btn validate-new-right btn-success\"><span class=\"glyphicon glyphicon-ok\"></span></button></td>"+
						"<td>" + tac + "</td>"+
						"</tr>";
		}
	}
	else if{
		alert("Votre confirmation n'as pas pu être prise en compte, veuillez réessayer ultérieurement.");
	}
};

site.modify_r= function () {
	var new_r = document.getElementsByClassName(new_right)[0];
	var data = {action: "modify-rights", right: new_r};
	tools.post(data, site.cb_val_new_r);
}

site.cb_val_new_r = function () {
	if (this.readyState == 4 && this.statusCode == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			alert("droits du membres bien modifié");
			location.reload(); 
		} else {
			alert("Les droits de ce membre n'a pas pu être modifié. Veulliez ré-essayer ultérieurement s'il-vous-plait.");
		}
	}
};

site.delete_member= function() {
	var log = document.getElementsByClassName(r[a].login)[0];
	var data = {action: "delete-member", login: log};
	tools.post(data, site.cb_del_member);
};

site.cb_del_valid = function () {
	if (this.readyState == 4 && this.statusCode == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			alert("membre supprimé");
			location.reload(); 
		} else {
			alert("Ce membre n'a pu être supprimé. Veulliez ré-essayer ultérieurement s'il-vous-plait.");
		}
	}
};

site.logout = function() {
    var data ={"action": "logout"};
	site.post(data, site.cb_logo);
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

window.onload = function () {
	setTimeout(site.on_ready, 1);
};
