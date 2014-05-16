var url = require("url");
var util = require("util");
var nodemailer = require("nodemailer");

//for testing
var mailAddressee = {
		mailAddress: "je545@hotmail.com",
		login: "userLogin",
		password: "userPw",
		registrationTemporaryCookie: "666"
	};

/**
 * This function extracts data from the url (n) to build the redirection link
 * @param targetMail (String): target mail address
 * @param senderMail (String): sender mail address
 * @param nuserLogin (String): user login
 * @param userPw (String): user password
 * @param userId (String): user Id
 * @param nameWebsite (String): url website
 * @return null
 */
exports.mail_router = function (targetMail, senderMail, userLogin, userPw, userId, nameWebsite) {
	//args: + service?, auth: password? //IL FAUT GENERER UNE ADRESSE MAIL POUR LE BLOG!!!
	var domain = url.parse(nameWebsite).hostname,
		textLink = domain + "ConfirmRegistration.html/?id=" + userId,//"http://www." + 
		smtpTransport = nodemailer.createTransport ("SMTP", {
			service: "Gmail", //default?
			auth: {
				user: senderMail,
				pass: "CAOsWebEsme2014"
			}
		}),
		mailRegistration = {
			from: senderMail,//smtpTransport.auth[0],
			to: targetMail,
			subject: "Confirmation inscription à " + domain,
			html: "<b>Bonjour, Bienvenue sur " + domain + " !</b><br>Nous vous remercions de votre inscription.<br>"
					+ "<br>Votre login est : " + userLogin
					+ "<br>Votre mot de passe est : " + userPw
					+ "<br>Cliquez sur " + '<a href=\"'+ textLink.toString() + '\">ce</a>' + " lien pour terminer votre inscription à " + domain + "."
					+ "<br><br>Bon surf."
					+ "<br><br><br>lien : " + textLink
		};

	smtpTransport.sendMail(mailRegistration, function (error, response) {
		if (error) {
			util.log(error);
		} else {
			util.log("Message (" + mailRegistration.subject + ") sent to " + mailRegistration.to + ": " + response.message);
		}
		smtpTransport.close();
	});
}

//for testing
//this.mail_router (mailAddressee.mailAddress, "noreply.caosweb@gmail.com", mailAddressee.login, mailAddressee.password, mailAddressee.registrationTemporaryCookie, "http://domain.com:3000/path/to/something?query=string#fragment");