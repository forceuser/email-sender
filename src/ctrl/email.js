import fs from "fs/promises";
import nodePath from "path";
import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function send ({
	file,
	text = `Hello world?`,
	html = `<b>Hello world?</b>`,
	subject = `Hello ✔`,
	from = `"Fred Foo 👻" <foo@example.com>`,
	to = ["forceuserz@gmail.com"],
} = {}) {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	let emailTransporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		},
	});

	// send mail with defined transport object
	let info = await emailTransporter.sendMail({
		from, // sender address
		to: (typeof to === "string" ? to.split(",").map($ => $.trim()) : to).join(", "), // list of receivers
		subject,
		text,
		html,
		attachments: [
			...(
				file
					? [{
						filename: nodePath.basename(file),
						content: fs.createReadStream(file),
					}]
					: []
			),
		],
	});

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
