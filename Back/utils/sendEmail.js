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

module.exports = sendEmail
