var confirmRegistration = {};

confirmRegistration.on_ready = function () {
	document.addEventListener("click", confirmRegistration.on_click);
};

confirmRegistration.on_click = function (ev){
	var src = ev.target;
};

function getid(VarSearch){
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] == VarSearch){
            return KeyValuePair[1];
        }
    }
}
confirmRegistration.sendID=function () {
	var idsite=getid();
	var data = {action: "confirm-registration-CAOSWeb", ID:idsite};
	tools.post(data, site.cb_reg_caos);
}

site.cd_reg_caos = function () {
	if (this.readyState == 4 && this.statusCode == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
		has_class("go_site").add_href("www.caosweb.com/"+getid());// rajouter au bouton "go site" href du nom de domaine.
		} 
		else {
			alert("Votre confirmation n'as pas pu être prise en compte, veuillez réessayer ultérieurement.");
		}
	}
};


window.onload = function () {
	setTimeout(confirmRegistration.on_ready, 1);
};

HTMLElement.prototype.has_class = function(s) {
	return (this.className.indexOf(s) >= 0);
};

HTMLElement.prototype.add_class = function(cl) {
	this.className += " " + cl;
};

HTMLElement.prototype.remove_class = function (cl) {
	var b = new RegExp(cl, "g");
	this.className = this.className.replace(b, "");
};