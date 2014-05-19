var register = {};

register.on_ready = function () {
console.log("on_ready trigger event");
	document.addEventListener("click", register.on_click);
};

register.on_click = function (ev){
	var src = ev.target;
	console.log("on_click avant 19");
	if (src.has_class("registerCAOSWeb")){
		register.submit();
	}
};

register.submit = function () {
	var mail = document.getElementsByClassName("mail")[0];
	var cmail = document.getElementsByClassName("cmail")[0];
	var pw = document.getElementsByClassName("pw")[0];
	var cpw = document.getElementsByClassName("cpw")[0];
	var p = document.getElementsByClassName("pseudo")[0];
	var nom = document.getElementsByClassName("nomSite")[0];
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
		var data = {action: "register-caosweb", email: mail.value, password: pw.value, login: p.value, site_name: nom.valuex};
		tools.post(data, register.cb_reg_CAOSWeb);
	} 
}

register.cb_reg_CAOSWeb = function () {
	if (this.readyState == 4 && this.status == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			alert("Un mail vous a été envoyé pour pouvoir finir votre inscription.");
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