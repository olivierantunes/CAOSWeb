var util = require("util");
var nodemailer = require("nodemailer");

//for testing
var mailAddressee = {
		mailAddress: "je545@hotmail.com",//je545@hotmail.comloic@plard.fr
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
	}
);

exports.mailRouter = function (addressee, addresseeLogin, addresseePassword, addresseeRegistrationTemporaryCookie) {
	var textLink = "file:///C:/Users/Soap/Documents/GitHub/CAOSWeb/site/ConfirmRegistration.html?idUser=" + addresseeRegistrationTemporaryCookie,
		mailRegistration = {
			from: "CAOsWeb <noreply.caosweb@gmail.com>",
			to: addressee,
			subject: "Confirmation inscription : CAOsWeb",
			html: "<b>Bonjour, Bienvenue sur CAOsWeb !</b><br>Nous vous remercions de votre inscription à CAOsWeb, site de création de blogs.<br><br>Votre login est : "
					+ addresseeLogin
					+ "<br>Votre mot de passe est : " + addresseePassword
					+ "<br>Cliquez sur " + '<a href=\"'+ textLink.toString() + '\">ce</a>' + " lien pour confirmer votre inscription et continuer la création de votre blog"
					+ "<br><br><br>lien : " + textLink
		}

	smtpTransport.sendMail(mailRegistration, function (error, response){
		if (error) {
			util.log(error);
		} else {
			util.log("Message (" + mailRegistration.subject + ") sent to " + mailRegistration.to + ": " + response.message);
		}
		smtpTransport.close();
	});
}

//for testing
this.mailRouter (mailAddressee.mailAddress, mailAddressee.login, mailAddressee.password, mailAddressee.registrationTemporaryCookie);