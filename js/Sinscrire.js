var register = {};

register.on_ready = function () {
	console.log("on_ready trigger event");
	document.addEventListener("click", register.on_click);
	register.ask_right();
};

register.ask_right = function() {
    var data ={action: "get-rights"};
	tools.post(data, register.cb_rights);
};

register.cb_rights = function () {
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
								"<li class=\"blog-nav-item logout active\">Se déconnecter</li>"+
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
								"<li class=\"blog-nav-item logout active\">Se déconnecter</li>"+
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
								"<li class=\"blog-nav-item logout active\">Se déconnecter</li>"+
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
								"<li class=\"blog-nav-item logout active\">Se déconnecter</li>"+
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

register.log_out = function() {
    var data ={"action": "logout"};
	tools.post(data, register.cb_logo);
};

register.cb_logo = function () {
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

register.on_click = function (ev){
	var src = ev.target;
	console.log("on_click avant 19");
	if (src.has_class("submit-register")){
		register.submit();
	}
	if (src.has_class("logout")){
	register.log_out();
	}
};

register.submit = function () {
	var mail = document.getElementsByClassName("mail")[0];
	var cmail = document.getElementsByClassName("cmail")[0];
	var pw = document.getElementsByClassName("pw")[0];
	var cpw = document.getElementsByClassName("cpw")[0];
	var p = document.getElementsByClassName("pseudo")[0];
	register.reset_class(mail);
	register.reset_class(cmail);
	register.reset_class(pw);
	register.reset_class(cpw);
	if (mail.value != cmail.value || !mail.value || pw.value != cpw.value || !pw.value){
		if (mail.value != cmail.value || !mail.value){
			mail.add_class("alert-danger");
			cmail.add_class("alert-danger");
		} 
		else {
			mail.add_class("alert-success");
			cmail.add_class("alert-success");
		}
		if(pw.value != cpw.value || !pw.value){
			pw.add_class("alert-danger");
			cpw.add_class("alert-danger");
		}
		else{
			pw.add_class("alert-success");
			cpw.add_class("alert-success");
		}
	}
	else if (mail.value == cmail.value || mail.value || pw.value == cpw.value || pw.value){
		var data = {action: "register-blog", email: mail.value, password: pw.value, login: p.value};
		tools.post(data, register.cb_reg_blog);
	} 
}

register.cb_reg_blog = function () {
	if (this.readyState == 4 && this.status == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			alert("Un mail vous a été envoyé pour pouvoir finir votre inscription.");
			location.assign("../site/Accueil.html");
		} else {
			alert("Votre inscription n'as pas pu être prise en compte, veuillez réessayer ultérieurement.");
		}
	}
};

register.reset_class = function (e) {
	e.remove_class("alert-danger");
	e.remove_class("alert-success");
};


window.onload = function () {
	setTimeout(register.on_ready, 1);
	setTimeout(register.cb_rights, 1);
};

HTMLElement.prototype.add_class = function(cl) {
	this.className += " " + cl;
};

HTMLElement.prototype.remove_class = function (cl) {
	var b = new RegExp(cl, "g");
	this.className = this.className.replace(b, "");
};