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

site.cb_membres = function () {
	//if (readystate) //TODO
	var membre0 = {
		pseudo: "MmeMichu",
		mail: "a@b.c",
		rights: 0,
	}
	var membre1 = {
		pseudo: "MmeMichu1",
		mail: "b@b.c",
		rights: 1,
	}
	var membre2 = {
		pseudo: "MmeMichu2",
		mail: "c@b.c",
		rights: 2,
	}
	
	var r = new Array();
	r.push(membre0);
	r.push(membre1);
	r.push(membre2);
	
	//ici
	
	var elt = document.getElementsByClassName("dynamic-membres")[0];
	for (a in r) {
		var tac = "";
		if (r[a].rights) {
			tac = "<button id=\"deletemember\" class=\"btn btn-danger\"><span class=\"glyphicon glyphicon-trash\"></span></button>";
		}
		
		r[a].rights = rights_match[r[a].rights];
	elt.innerHTML += 	"<tr>"+
						"<td>"+r[a].pseudo+"</td>"+
						"<td>"+r[a].mail+"</td>"+
						"<td>"+r[a].rights+"</td>"+
						"<td>" + tac + "</td>"+
						"</tr>";
	};
};

window.onload = function () {
	setTimeout(site.on_ready, 1);
	setTimeout(site.cb_membres, 500);
};

HTMLElement.prototype.has_class = function(s) {
	return (this.className.indexOf(s) >= 0);
};