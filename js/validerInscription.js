var confirmRegistration = {};

confirmRegistration.on_ready = function () {
	document.addEventListener("click", confirmRegistration.on_click);
};

confirmRegistration.on_click = function (ev){
	var src = ev.target;
	
	if (src.has_class("submit-register")){
		confirmRegistration.submit();
	}
};

confirmRegistration.submit = function () {
	var nameWebSite = document.getElementsByClassName("nameSite")[0];
	confirmRegistration.reset_class(nameWebSite);
	if (!nameWebSite.value){
		nameWebSite.add_class("alert-danger");
	} 
	else {
		nameWebSite.add_class("alert-success");
	}
	//do not undersand this line \/ ---------------------------------------------------------------------------------------------
	if (mail.value != cmail.value || !mail.value || pw.value != cpw.value || !pw.value) {
		var param = function GetUrlValue("idUser"){
			var SearchString = window.location.search.substring(1);
			var VariableArray = SearchString.split('&');
			for(var i = 0; i < VariableArray.length; i++){
				var KeyValuePair = VariableArray[i].split('=');
				if(KeyValuePair[0] == VarSearch){
					return KeyValuePair[1];
				}
			}
		}

		if (param && "idUser" == param) {
			var data = {action: "confirm_registration", nameWebSite: nameWebSite, temporaryCookie: param};
			//tools.post(data, confirmRegistration.cb_sub); ----------------------------------------------------------------------
		} else {
			//TODO: alert message
		}
	} 
}

site.cb_sub = function () {
	if (this.readyState == 4 && this.statusCode == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			alert("registration confirmed");
		} else {
			alert("fail");
		}
	}
};

confirmRegistration.reset_class = function (e) {
	e.remove_class("alert-danger");
	e.remove_class("alert-success");
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