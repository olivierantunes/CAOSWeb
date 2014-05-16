var confirmRegistration = {};

confirmRegistration.on_ready = function () {
	document.addEventListener("click", confirmRegistration.on_click);
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
	tools.post(data, site.cb_reg_caos);
};

confirmRegistration.cb_reg_caos = function () {
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