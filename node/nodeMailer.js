var util = require("util");
var nodemailer = require("nodemailer");

var mailAuthor = "CAOsWeb <noreply.caosweb@gmail.com>"
	mailAddressee = {
		mailAddress: "je545@hotmail.com",
		login: "userLogin",
		password: "userPw",
		registrationTemporaryCookie: "666"
	}

var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "noreply.caosweb@gmail.com",
        pass: "CAOsWebEsme2014"
    }
});

exports.mailRouter = function (author, addressee, addresseeLogin, addresseePassword, addresseeRegistrationTemporaryCookie) {
	//example: var textLink = "http://" + req.headers.host + "/signup?token=" + data.hashedEmail;
	//or: var textLink = "file:///C:/Users/Soap/Documents/GitHub/CAOSWeb/site/ConfirmRegistration.html?id=" + addresseeRegistrationTemporaryCookie,
	var textLink = "file:///C:/Users/Soap/Documents/GitHub/CAOSWeb/site/ConfirmRegistration.html?token=" + addresseeRegistrationTemporaryCookie,
		mailRegistration = {
			from: author,
			to: addressee,
			subject: "Inscription : CAOsWeb",
			text: "Bonjour, Bienvenue sur CAOsWeb !",
			html: "<b>Bonjour, Bienvenue sur CAOsWeb !</b><br>Message automatique de confirmation d'inscription a CAOsWeb.<br><br><br>Votre login est : "
					+ addresseeLogin
					+ "<br>Votre mot de passe est : " + addresseePassword
					+ "<br>Cliquez sur " + '<a href=\"'+ textLink.toString() + '\">ce</a>' + " lien pour confirmer votre inscription et continuer la création de votre blog"
					+ "<br><br><br>lien : " + textLink
		}

	smtpTransport.sendMail(mailRegistration, function(error, response){
		if (error) {
			util.log(error);
		} else {
			util.log("Message (" + mailRegistration.subject + ") sent to " + mailRegistration.to + ": " + response.message);
		}
		smtpTransport.close();
	});

}

this.mailRouter (mailAuthor, mailAddressee.mailAddress, mailAddressee.login, mailAddressee.password, mailAddressee.registrationTemporaryCookie);