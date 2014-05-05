var site={};

site.on_ready = function () {
	document.addEventListener("click", site.on_click);
};

site.on_click = function (ev){
	var src = ev.target;
	
	console.log("toc");
	
	if (src.has_class("go-top")){
		window.scrollTo(0,0);
	} else if (src.has_class("go-dec")) {
		var t = document.getElementById("dec");
		window.scrollTo(0, t.offsetTop);
	}

};
site.cb_rights = function () {
	//if (readystate) //TODO
	var rights = {
		rights: "1"
	}
	
	var r = new Array();
	r.push(rights);
	
	//ici
	
	var elt = document.getElementsByClassName("dynamic-rights")[0];
	if (r=="1") {
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
						"</ul>"+
					"</div>";
	}
	else if (a in r equals "2") {
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
						"</ul>"+
					"</div>";
	}
	else if (a in r equals "3") {
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
						"</ul>"+
					"</div>";
	}
	else if (a in r equals "4") {
	elt.innerHTML +="<div class=\"container\">"+
						"<ul class=\"nav nav-pills pull-left\">"+
							"<li class=\"blog-nav-item active\"><a href=\"Accueil.html\">Accueil</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"contact.html\">Contacts</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"faq.html\">FAQ</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"RedigerArticle.html\">Publier</a></li>"+
						"</ul>"+
						"<ul class=\"nav nav-pills pull-right\">"+
							"<li class=\"blog-nav-item active\"><a href=\"compte.html\">Compte</a></li>"+
						"</ul>"+
					"</div>";
	}
	else if (a in r equals "5") {
	elt.innerHTML +="<div class=\"container\">"+
						"<ul class=\"nav nav-pills pull-left\">"+
							"<li class=\"blog-nav-item active\"><a href=\"Accueil.html\">Accueil</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"contact.html\">Contacts</a></li>"+
							"<li class=\"blog-nav-item active\"><a href=\"faq.html\">FAQ</a></li>"+
						"</ul>"+
						"<ul class=\"nav nav-pills pull-right\">"+
							"<li class=\"blog-nav-item active\"><a href=\"compte.html\">Compte</a></li>"+
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
/*<div class="container">
			<ul class="nav nav-pills pull-left">
				<li class="blog-nav-item active"><a href="Accueil.html">Accueil</a></li>
				<li class="blog-nav-item active"><a href="contact.html">Contacts</a></li>
				<li class="blog-nav-item active"><a href="faq.html">FAQ</a></li>
				<li class="blog-nav-item active"><a href="RedigerArticle.html">Publier</a></li>
				<li class="blog-nav-item active"><a href="ValiderArticle.html">Valider</a></li>
				<li class="dropdown blog-nav-item active">
				<a class="dropdown-toggle" data-toggle="dropdown" href="#">Admin<b class="caret"></b></a>
				<ul class="dropdown-menu">
					<li><a href="gererMembres.html">Gérer les utilisateurs</a></li>
					<li><a href="changerForme.html">Changer la forme</a></li>
				</ul>
				</li>
			</ul>
			<ul class="nav nav-pills pull-right">
				<li class="blog-nav-item active"><a href="compte.html">Compte</a></li>
				<li class="blog-nav-item active"><a href="Sinscrire.html">S'incrire</a></li>
				<li class="blog-nav-item active"><a href="SeConnecter.html">Se connecter</a></li>
			</ul>
		</div>*/

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

/* <h3 class="blog-post-title" id="jan">Le titre de votre article le plus récent</h3>
            <p class="blog-post-meta">1 Janvier 2014 par <a href="#">Jean</a><button id="delete" name="button1id" class="btn btn-danger pull-right">X</button></p>
            <blockquote>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit lectus at metus consectetur egestas. Nulla ut eros orci. Fusce lobortis eros mi, non posuere leo hendrerit eu. Vivamus magna odio, mollis et vehicula suscipit, rutrum id sapien. Nulla sodales molestie justo, eu euismod mi fringilla eu. Mauris lobortis, sem sit amet tincidunt scelerisque, ante mauris facilisis nibh, ut sagittis enim justo at lacus. Nam ut suscipit nibh, quis porta ante. Integer enim turpis, bibendum convallis euismod eget, vehicula in velit. Etiam bibendum nulla nec turpis feugiat feugiat. Cras porttitor, metus in dictum mollis, ante magna dapibus nisl, vitae gravida neque sapien at enim. Nam sit amet libero dignissim, vulputate mauris at, pellentesque metus. Ut cursus enim magna, quis dapibus leo lobortis at. Donec pellentesque lectus blandit, vehicula leo ultrices, ornare tellus. Morbi ac dolor aliquam, iaculis ante pulvinar, interdum ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. </p>
            </blockquote>*/

site.cb_info = function () {
	//if (readystate) //TODO
	var info = {
		pseudo: "MmeMichu",
		email: "a@b.c",
		password: "mdp",
		rights: "Administrator"
	}
	
	var r = new Array();
	r.push(info);
	
	//ici
	
	var elt = document.getElementsByClassName("dynamic-info")[0];
	for (a in r) {
	elt.innerHTML += "pseudo :  " + r[a].pseudo + "<br></br>" +
					"email :  " + r[a].email +" <br></br>" +
					"password :  " + r[a].password + "<br></br>" +
					"Vos droits :   " + r[a].rights;
	};
};

window.onload = function () {
	setTimeout(site.on_ready, 1);
	setTimeout(site.cb_art, 1500);
	setTimeout(site.cb_info, 1500);
	setTimeout(site.cb_rights, 1000);
};

HTMLElement.prototype.has_class = function(s) {
	return (this.className.indexOf(s) >= 0);
};