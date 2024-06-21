const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function emailSender(email, token) {
  let mailOptions = {
    from: 'Suporte CodaWeb <no-reply@codaweb.com.br>',
    to: email,
    subject: 'Recuperação de senha CodaWeb',
    text: `Seu token para recuperação de senha é: ${token}, copie e cole na seção de recuperação de senha.`,
    html: `
    <!DOCTYPE html>
    <html lang="pt">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <style>
      body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
      .container { width: 90%; margin: auto; overflow: hidden; }
      header {
        background: #fff;
        background-image: linear-gradient(0deg, transparent 24%, rgba(0,190,103,0.5) 25%, rgba(0,190,103,0.5) 26%, transparent 27%, transparent 74%, rgba(0,190,103,0.5) 75%, rgba(0,190,103,0.5) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,190,103,0.5) 25%, rgba(0,190,103,0.5) 26%, transparent 27%, transparent 74%, rgba(0,190,103,0.5) 75%, rgba(0,190,103,0.5) 76%, transparent 77%, transparent);
        background-size: 10px 10px;
        color: #333;
        padding: 20px;
        text-align: center;
      }
      footer { background: #fff; color: #333; text-align: center; padding: 10px; }
      main { min-height: 300px; margin: 10px;}
      .title{color: #333; font-weight: 800;}
      .sub-header{background: #c0d8d7; padding: 10px;}
      .social-icons { display: flex; justify-content: center; padding: 10px 0; }
      .social-icons img {width: 24px; height: 24px; margin: 0 5px; }
      a {text-decoration: none; color: #333;}
    </style>
    </head>
    <body>
      <div class="container">
        <header>
          <h1 class="title">CodaWeb</h1>
        </header>
        
        <main>
          <section class="sub-header">
            <h2>Título Principal</h2>
            <p>Seu token para recuperação de senha é: ${token}, copie e cole na seção de recuperação de senha.</p>
          </section>
        </main>
    
        <footer>
          <div class="social-icons">
            <a href="https://github.com/"><img src="../assets/github-icon.png" alt="Github"></a>
            <a href="https://instagram.com/"><img src="../assets/instagram-icon.png" alt="Instagram"></a>
            <a href="https://twitter.com/"><img src="../assets/x-icon.png" alt="Twitter"></a>
          </div>
          <p>contato@codaweb.com.br</p>
          <a href="https://codaweb.com.br"><p>www.codaweb.com.br</p></a>
        </footer>
      </div>
    </body>
    </html>
    `
  };
  const info = await transporter.sendMail(mailOptions);
  console.log('Email enviado: ' + info.response);
};

module.exports = emailSender;
