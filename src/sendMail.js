require('dotenv').config();
const axios = require('axios');
const nodeMailer = require('nodemailer');
const urlBase = 'https://agora-webchat.herokuapp.com';
// const urlBase = 'http://localhost:8080';

const sendEmail = async(userData) => {

    const { userName, email, userId } = userData;

    const transporter = nodeMailer.createTransport({
        host:  'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        }
    });
    
    transporter.sendMail({
        from: `Agora Chat <webchat.agora@gmail.com>`,
        to: email,
        subject: 'Confirm your email',
        text: 'testando nodemailer',
        html: generateEmailBody(userName, userId, email)
    })
    .then(message => console.log(message))
    .catch(err => console.log(err))

}

const generateEmailBody = (userName, userId, email) => {

    const body = `
        <html>
            <head>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,400;1,200;1,400&display=swap');
                    
                    h2 {
                        text-align: center;
                        font-size: 2em;
                        font-family: 'Poppins', sans-serif;
                        color: #5d17eb;
                    }
                    p {
                        font-family: 'Poppins', sans-serif;
                        text-align: justify;
                        font-family: 1.2em;
                        color: #000;
                        margin: 15px 5px;
                    }
                    button {
                        heigth: 35px;
                        width: 100%;
                        border-radius: 5px;
                        border: none;
                        background-color: #5d17eb;
                    }
                    a button {
                        text-decoration: none;
                        font-size: 1.2em;
                        color: #fff;
                        font-family: 'Poppins', sans-serif;
                        padding: 10px;
                    }
                    a {
                        text-decoration: none;
                        font-size: 1.2em;
                        color: #5d17eb;
                        font-family: 'Poppins', sans-serif;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Welcome to Agora Chat</h2>
                    <p>Hello ${userName} (user id: ${userId}), welcome to Agora Web Chat, a realtime chat built in node, js , html and css. Thank you for your registration, before using our chat you need to confirm your email by clicking on the link below.</p>
                    <a href="${urlBase}/confirmEmail/${userId}" target="_blank" id="linkBttn"><button>Confirm your email</button></a>
                    <p>If you are unable to access the click or copy click by Bhutan and paste the link below into your browser. </p>
                    <a href="${urlBase}/confirmEmail/${userId}" id="link" target="_blank">${urlBase}/confirmEmail/${userId}</a>
                </div>
            </body>
        </html>
    `;

    return body;
}

module.exports = sendEmail;