var register = {};

register.on_ready = function () {
	console.log("on_ready trigger event");
	document.addEventListener("click", register.on_click);
};

register.on_click = function (ev){
	var src = ev.target;
	console.log("on_click avant l9");
	
	if (src.has_class("submit-register")){
		console.log("on_click apres l12");
		register.submit();
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
	
	//do not understand the following line
	if (mail.value != cmail.value || !mail.value || pw.value != cpw.value || !pw.value){
		var data = {action: "register", email: mail, password: pw, pseudo: p}; //submit -> register: last change
		tools.post(data, register.cb_sub);
	} 
}

//last addition
register.cb_sub = function () {
	if (this.readyState == 4 && this.statusCode == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			alert("registrationOperationLaunched");
		} else {
			alert("fail");
		}
	}
};

site.cb_sub = function () {
	if (this.readyState == 4 && this.statusCode == 200) {
		var r = JSON.parse(this.responseText);
		if (r.resp == "ok") {
			alert("ok");
		} else {
			alert("FAIL");
		}
	}
};

register.reset_class = function (e) {
	e.remove_class("alert-danger");
	e.remove_class("alert-success");
};


window.onload = function () {
	setTimeout(register.on_ready, 1);
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