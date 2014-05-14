var site={};

site.on_ready = function () {
	document.addEventListener("click", site.on_click);
};

site.ask_right = function() {
    var data ={"action": "get_rights"};
	site.post(data, site.cb_rights);
};

site.cb_rights = function () {
	//if (readystate) //TODO
	var right = 1; //JSON.parse(this.responseText);
	//right=rights.role;
	var elt = document.getElementsByClassName("dynamic-rights")[0];
	if (rights == 0) {
	elt.innerHTML +="<div class=\"container\">"+
						"<ul class=\"nav nav-pills pull-left\">"+
							"<li class=\"blog-nav-item active\"><a href=\"Accueil.html\">Accueil</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"contact.html\">Contacts</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"faq.html\">FAQ</a></li>"+
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
							"<li class=\"blog-nav-item active\"><a href=\"compte.html\">Compte</a></li>"+
							"<li class=\"blog-nav-item logout active\"><a href=\"Accueil.html\">Se déconnecter</a></li>"+
						"</ul>"+
					"</div>";
	}
	else if (rights == 1) {
	elt.innerHTML +="<div class=\"container\">"+
						"<ul class=\"nav nav-pills pull-left\">"+
							"<li class=\"blog-nav-item active\"><a href=\"Accueil.html\">Accueil</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"contact.html\">Contacts</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"faq.html\">FAQ</a></li>"+
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
							"<li class=\"blog-nav-item active\"><a href=\"compte.html\">Compte</a></li>"+
							"<li class=\"blog-nav-item logout active\"><a href=\"Accueil.html\">Se déconnecter</a></li>"+
						"</ul>"+
					"</div>";
	}
	else if (rights == 2) {
	elt.innerHTML +="<div class=\"container\">"+
						"<ul class=\"nav nav-pills pull-left\">"+
							"<li class=\"blog-nav-item active\"><a href=\"Accueil.html\">Accueil</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"contact.html\">Contacts</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"faq.html\">FAQ</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"RedigerArticle.html\">Publier</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"ValiderArticle.html\">Valider</a></li>"+
						"</ul>"+
						"<ul class=\"nav nav-pills pull-right\">"+
							"<li class=\"blog-nav-item active\"><a href=\"compte.html\">Compte</a></li>"+
							"<li class=\"blog-nav-item logout active\"><a href=\"Accueil.html\">Se déconnecter</a></li>"+
						"</ul>"+
					"</div>";
	}
	else if (rights == 3) {
	elt.innerHTML +="<div class=\"container\">"+
						"<ul class=\"nav nav-pills pull-left\">"+
							"<li class=\"blog-nav-item active\"><a href=\"Accueil.html\">Accueil</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"contact.html\">Contacts</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"faq.html\">FAQ</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"RedigerArticle.html\">Publier</a></li>"+
						"</ul>"+
						"<ul class=\"nav nav-pills pull-right\">"+
							"<li class=\"blog-nav-item active\"><a href=\"compte.html\">Compte</a></li>"+
							"<li class=\"blog-nav-item logout active\"><a href=\"Accueil.html\">Se déconnecter</a></li>"+
						"</ul>"+
					"</div>";
	}
	else if (rights == 4) {
	elt.innerHTML +="<div class=\"container\">"+
						"<ul class=\"nav nav-pills pull-left\">"+
							"<li class=\"blog-nav-item active\"><a href=\"Accueil.html\">Accueil</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"contact.html\">Contacts</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"faq.html\">FAQ</a></li>"+
						"</ul>"+
						"<ul class=\"nav nav-pills pull-right\">"+
							"<li class=\"blog-nav-item active\"><a href=\"compte.html\">Compte</a></li>"+
							"<li class=\"blog-nav-item  logout active\"><a href=\"Accueil.html\">Se déconnecter</a></li>"+
						"</ul>"+
					"</div>";
	}
	else {
	elt.innerHTML +="<div class=\"container\">"+
						"<ul class=\"nav nav-pills pull-left\">"+
							"<li class=\"blog-nav-item active\"><a href=\"Accueil.html\">Accueil</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"contact.html\">Contacts</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"faq.html\">FAQ</a></li>"+
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

site.ask_validate = function() {
	var data ={"action": "get_validate"};
    //site.cb.art(data);
	site.post(data, site.cb_valid);
};

site.cb_valid = function () {
	//if (this.readyState == 4 && this.statusCode == 200) {
	//var r = JSON.parse(this.responseText);
	var art = {
		title: "Le titre de votre article le plus récent",
		date: new Date(),
		author: "azerty",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit lectus at metus consectetur egestas. Nulla ut eros orci. Fusce lobortis eros mi, non posuere leo hendrerit eu. Vivamus magna odio, mollis et vehicula suscipit, rutrum id sapien."
	}
	
	var r = new Array();
	r.push(art);
	r.push(art);
	r.push(art);
	r.push(art);
	
	//ici
	
	elt.innerHTML += "<h3 class=\"blog-post-title\" id=\"jan\">" + r[a].title + " " + a + "</h3>" +
					"<p class=\"blog-post-meta\">" + r[a].date + " par <a href=\"#\">" + r[a].author+ "</a>"+
					"<blockquote>" +
						"<p>" + r[a].content + "</p>" +
					"</blockquote>"+
					"<p style=\"display:hide\" class= \"ID \">r[a].ID<p>"
					"<button class=\"btn btn-success valid_article\">Valider</button>"+" "+
					"<button class=\"btn btn-danger delete_article\">Annuler</button>";
	};

site.valid_arti= function() {
	var art = document.getElementsByClassName("ID")[0];
	var data = {action: "validation-article", id: art};
	tools.post(data, site.cb_sub_valid);
};

site.cb_sub_valid = function () {
	if (this.readyState == 4 && this.statusCode == 200) {
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
	if (this.readyState == 4 && this.statusCode == 200) {
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
	site.submit_arti();
	}
	else if (src.has_class'"delete_article")){
	site.delte_arti();
	}
	else if (src.has_class("logout")){
	site.logout();
	}
};

window.onload = function () {
	setTimeout(site.on_ready, 1);
	setTimeout(site.cb_rights, 1);
	setTimeout(site.cb_valid, 500);
};

HTMLElement.prototype.has_class = function(s) {
	return (this.className.indexOf(s) >= 0);
};