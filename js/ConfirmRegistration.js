var confirmRegistration = {};

confirmRegistration.on_ready = function () {
	document.addEventListener("click", confirmRegistration.on_click);
	confirmRegistration.ask_site();
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
	var data = {action: "confirm-registration-CAOSWeb", ID: idsite.value};
	tools.post(data, site.cb_reg_caos);
};

confirmRegistration.ask_site = function() {
    var data ={action: "get-user-site"};
	//console.log("ask_right");//added by loic
	tools.post(data, confirmRegistration.cb_user_site);
};


confirmRegistration.cb_user_site = function () {
	if (this.readyState == 4 && this.status == 200) {
		var r = JSON.parse(this.responseText);	
		if (r.resp == "ok") {
			alert("Vous devriez recevoir un mail sous peu.");
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