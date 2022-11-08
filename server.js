const express = require('express')
const path = require('path');
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;

const app = express()
const PORT  = process.env.PORT || 5000


app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})
app.get('/sendEmail', (req, res) => {
  
  var name = req.query.name;
  var email = req.query.email;
  var subject = req.query.subject;
  var message = req.query.message;
 
  var dataEmail = {
    'from': email,
    'subject': subject,
    'text': message
  };
  sendEmail(dataEmail)

  res.send(true)
  
})

app.listen(PORT, () => console.log(`Listening on https://localhost:${ PORT }`));


function sendEmail(data){

  MongoClient.connect('mongodb+srv://victor:CCsEZu5jugVtfMnq@cluster0.vudsg.mongodb.net/?retryWrites=true&w=majority', async function (err, client) {

        if (err) throw err;
    
        var db = client.db('Portfolio');
        
        await db.collection('Message').insertOne(data);
        
    })
}