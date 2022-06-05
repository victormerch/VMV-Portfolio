const express = require('express')
const path = require('path');
var nodemailer = require('nodemailer');
const app = express()
const port = 3000
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})
app.get('/sendEmail', (req, res) => {
  
  var name = req.query.name;
  var email = req.query.email;
  var subject = req.query.subject;
  var message = req.query.message;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vmerchandeveloper@gmail.com',
      pass: 'wAJqF$@hZedu'
    }
  });
  
  var mailOptions = {
    from: 'vmerchandeveloper@gmail.com',
    to: 'vmerchandeveloper@gmail.com',
    subject: subject,
    text: 'Name: '+name+'\nEmail: '+email+'\nMessage: '+message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send(false);
    } else {
      console.log('Email sent: ' + info.response);
      res.send(true)
    }
    
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})