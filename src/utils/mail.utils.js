const nodeMailer = require("nodemailer")
const config = require("../config")

const transporter = nodeMailer.createTransport({
    host : config.smtp.host,
    port : config.smtp.port,
    secure : config.smtp.secure,
    auth : {
        user : config.smtp.user,
        pass : config.smtp.pass
    },
    // connectionTimeout: 20000, 
    // socketTimeout: 20000,
})

transporter.verify(function (error, success) {
    if (error) {
      console.log("SMTP bağlantı hatası:", error);
    } else {
      console.log("SMTP bağlantısı başarılı!");
    }
  });

const sendMail = (from, to, subject, content) => {
    try {
        let result = transporter.sendMail({
            from,
            to,
            subject,
            html : content
        })
        return result
    } catch (err) {
        console.error(err);
        return false
    }
}

module.exports = {
    sendMail
}