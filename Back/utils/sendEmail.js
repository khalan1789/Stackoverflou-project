const nodemailer = require("nodemailer")
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
require("dotenv").config()

const sendEmail = async (email, subject, payload, template) => {
    try {
        // first, reusable transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.mail.yahoo.com",
            service: "yahoo",
            port: 485,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        })

        // prepare to convert text in a good email format
        const source = fs.readFileSync(path.join(__dirname, template), "utf-8")
        const compiledTemplate = handlebars.compile(source)
        const options = () => {
            return {
                from: "stackoverflou@yahoo.com",
                to: email,
                subject: subject,
                html: compiledTemplate(payload),
            }
        }
        // sending email
        transporter.sendMail(options(), (error, info) => {
            if (error) {
                return error
            } else {
                return res.status(200).json({ success: true })
            }
        })
    } catch (error) {
        return error
    }
}

// version 2 de nodemail

// const sendEmail = async (email, name, link) => {
//     // create a transporter
//     let transporter = nodemailer.createTransport({
//         host: "smtp.stackoverflou.net",
//         port: 587,
//         secure: false,
//         auth: {
//             user: process.env.EMAIL_USERNAME,
//             pass: process.env.EMAIL_PASSWORD,
//         },
//     })

//     let info = await transporter.sendEmail({
//         from: "no-reply@stackoverflou.net",
//         to: email,
//         subject: "Demande de réinitialisation de mot de passe",
//         html: "
//             <html>
//                 <head>
//                     <style></style>
//                 </head>
//                 <body>
//                     <h4> Hey {{ name }}</h4>
//                     <p>
//                         Vous avez fait une demande de réinitialisation de mot de
//                         passe
//                     </p>
//                     <p>
//                         Pour ce faire merci de bine vouloir cliquer sur le lien
//                         suivant afin de procéder à la réinitialisation.
//                     </p>
//                     <a href={`https://${link}`}>
//                         Réinitialiser mon mot de passe
//                     </a>
//                 </body>
//             </html>
//         ",
//     })

//     console.log("message envoyé ?", info.messageId)
//     console.log("Preview URL: ", nodemailer.getTestMessageUrl(info))

//     info()
// }

module.exports = sendEmail
