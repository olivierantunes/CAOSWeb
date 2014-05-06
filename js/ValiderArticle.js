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
	} else if (src.has_class("submit-art")){
	
	}

};
site.cb_valid = function () {
	//if (readystate) //TODO
	var valid = {
		title: "Le titre de votre article à valider le plus ancien",
		date: new Date(),
		author: "azerty",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit lectus at metus consectetur egestas. Nulla ut eros orci. Fusce lobortis eros mi, non posuere leo hendrerit eu. Vivamus magna odio, mollis et vehicula suscipit, rutrum id sapien."
	}
	
	var r = new Array();
	r.push(valid);
	r.push(valid);
	r.push(valid);
	r.push(valid);
	
	//ici
	
	var elt = document.getElementsByClassName("dynamic-valid")[0];
	for (a in r) {
	elt.innerHTML += "<h3 class=\"blog-post-title\" id=\"jan\">" + r[a].title + " " + a + "</h3>" +
					"<p class=\"blog-post-meta\">" + r[a].date + " par <a href=\"#\">" + r[a].author+ "</a>"+
					"<blockquote>" +
						"<p>" + r[a].content + "</p>" +
					"</blockquote>"+
					"<button class=\"btn btn-success valid_article\">Valider</button>"+" "+
					"<button class=\"btn btn-danger\">Annuler</button>";
	};
};

site.cb_valid_article= function () {

}


window.onload = function () {
	setTimeout(site.on_ready, 1);
	setTimeout(site.cb_valid, 500);
};

HTMLElement.prototype.has_class = function(s) {
	return (this.className.indexOf(s) >= 0);
};