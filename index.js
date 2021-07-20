// -----------------------------------------
const accountSid = 'AC5ae6684bd7945e1ad2515bde21437117';
const authToken = '1b80f25529a2b51f03fff3d5b60005fe';

const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const client = new twilio(accountSid, authToken);
const app = express();

const port = process.env.PORT || 3000;

const MessagingResponse = twilio.twiml.MessagingResponse;

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('This is just a TEST!')
});

var history = {};

app.post('/sms', (req, res) => {
    let from = req.body.From;
    let to = req.body.To;
    let body = req.body.Body;

    const twiml = new MessagingResponse();

    if (body === 'bye') {
        twiml.message(`Goodbye!`);
        history = {};
    }

    if (Object.keys(history).length == 0 || !(from in history) ) { // First Message
        twiml.message(`Hi!`);
        twiml.message(`What's the matter?`);
        history[from] = [ body ]
    } else { // If he has a history
        var messages = history[from];
        var lastMessage = messages[messages.length - 1];

        switch (body) {
            case 'test 1':
                twiml.message(`This Work!!`);
                break;
        
            default:
                twiml.message(`Hello Again!`);
                twiml.message(`This is your last message ${lastMessage}`);
                break;
        }

        history[from] = [ body, ...messages ]
    }
  
    
    twiml.message(`Just a Test!`);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end('All Ok!');
});


app.listen(port, () => {
    console.log(`The server is working on the port ${port}`)
});
// -----------------------------------------

