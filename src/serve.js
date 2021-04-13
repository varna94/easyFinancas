const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
    res.send(
        "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
    );
});

app.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
        console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
        res.send(info);
    });
});


async function sendMail(user, callback, id) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: details.email,
            pass: details.password
        }
    });

    let mailOptions = {
        from: '"Fun Of Heuristic"<example.gimail.com>', // sender address
        to: user.email, // list of receivers
        subject: "Wellcome to Fun Of Heuristic 👻", // Subject line
        html: `<h1>Hi ${user.name} - ${id}</h1><br>
    <h4>Thanks for joining us</h4>
    <button id="${id}">Clique aqui</button>`
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info);
}
// let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     service: "gmail",
//     auth: {
//         user: "easyfinancas2@gmail.com",
//         pass: "12345678EF"
//     }
// });

// transporter.sendMail({
//     from: "Kelly V. <easyfinancas2@gmail.com>",
//     to: "teste.email.easyFinan@mailinator.com",
//     subject: "olá! teste de envio email.",
//     text: "corpo do email, teste email node.",
//     html: "<p>corpo do email, teste email node.</p><button>Clique aqui</button>"
// }).then(message => {
//     console.log(message);
// }).catch(err => {
//     console.log(err);
// });

// let port = process.env.PORT || '4200';

// app.app.listen(port, function() {
//     console.log(`server running in" + ${port}`);
// });
