const nodeMailer = require("nodemailer")
const config = require("../config")

const transporter = nodeMailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: {
        user: config.smtp.user,
        pass: config.smtp.pass
    },
    connectionTimeout: 60000, // 60 saniye
    socketTimeout: 60000, // 60 saniye
})

transporter.verify(function (error, success) {
    if (error) {
        console.log("SMTP bağlantı hatası:", error);
    } else {
        console.log("SMTP bağlantısı başarılı!");
    }
});

const sendMail = async (from, to, subject, content) => {
    try {
        let result = await transporter.sendMail({
            from,
            to,
            subject,
            html: content
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