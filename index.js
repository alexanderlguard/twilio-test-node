// -----------------------------------------
const accountSid = 'AC5ae6684bd7945e1ad2515bde21437117';
const authToken = '1b80f25529a2b51f03fff3d5b60005fe';

const express = require('express');
const bodyParser = require('bodyParser');
const twilio = require('twilio');

const client = new twilio(accountSid, authToken);
const app = express();

const port = process.env.PORT || 3000;

const MessagingResponse = twilio.twiml.MessagingResponse;

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('This is just a TEST!')
});

app.post('/sms', (req, res) => {
    let from = req.body.from;
    let to = req.body.to;

    const twiml = new MessagingResponse();
  
    twiml.message(`From: ${from} To: ${to}`);
  
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});


app.listen(port, () => {
    console.log(`The server is working on the port ${port}`)
});
// -----------------------------------------

