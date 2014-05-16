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
	} else if (src.has_class("submit-contact")){
	
	}

};
site.submit_contact= function() {
	var e = document.getElementsByClassName("email")[0];
	var r= document.getElementsByClassName("request")[0];
	var d= document.getElementsByClassName("details")[0];
	
	var data = {action: "submit-contact", email: e, request: r, details: d};
	tools.post(data, site.cb_sub_contact);
};

site.cb_sub_contact = function () {
	if (this.readyState == 4 && this.statusCode == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			alert("Request sent");
		} else {
			alert("FAIL");
		}
	}
};

window.onload = function () {
	setTimeout(site.on_ready, 1);
	setTimeout(site.cb_rights, 1);
};
