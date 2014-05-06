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
	setTimeout(site.cb_art, 500);
};

HTMLElement.prototype.has_class = function(s) {
	return (this.className.indexOf(s) >= 0);
};