var site={};

site.on_ready = function () {
	document.addEventListener("click", site.on_click);
};

site.cb_rights = function () {
	//if (readystate) //TODO
	var rights = 1;
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
							"<li class=\"blog-nav-item active\"><a id=\"logout\">Se déconnecter</a></li>"+
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
							"<li class=\"blog-nav-item active\"><a id=\"logout\">Se déconnecter</a></li>"+
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
							"<li class=\"blog-nav-item active\"><a id=\"logout\">Se déconnecter</a></li>"+
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
							"<li class=\"blog-nav-item active\"><a id=\"logout\">Se déconnecter</a></li>"+
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
							"<li class=\"blog-nav-item active\"><a id=\"logout\">Se déconnecter</a></li>"+
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

site.cb_art = function () {
	//if (readystate) //TODO
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
	
	var elt = document.getElementsByClassName("dynamic-art")[0];
	for (a in r) {
	elt.innerHTML += "<h3 class=\"blog-post-title\" id=\"jan\">" + r[a].title + " " + a + "</h3>" +
					"<p class=\"blog-post-meta\">" + r[a].date + " par <a href=\"#\">" + r[a].author + "</a><button id=\"delete\" name=\"button1id\" class=\"btn btn-danger pull-right\"><span class=\"glyphicon glyphicon-trash\"></span></button></p>" +
					"<blockquote>" +
						"<p>" + r[a].content + "</p>" +
					"</blockquote>";
	};
};


window.onload = function () {
	setTimeout(site.on_ready, 1);
	setTimeout(site.cb_rights, 1);
	setTimeout(site.cb_art, 500);
};

HTMLElement.prototype.has_class = function(s) {
	return (this.className.indexOf(s) >= 0);
};