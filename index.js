// -----------------------------------------
const accountSid = 'AC5ae6684bd7945e1ad2515bde21437117';
const authToken = 'dfa4a86b64bec4978eb2ca251a8a4c50';

const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const client = new twilio(accountSid, authToken);
const app = express();

const port = process.env.PORT || 3000;

const MessagingResponse = twilio.twiml.MessagingResponse;

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    client.messages.create({
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        from: '+18324301022',
        to: '+18312247870'
    })
    .then(message => {
        console.log(message.sid);
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end('This is just a TEST 1!');
    });
});

var history = {};

app.post('/sms', (req, res) => {

    const twiml = new MessagingResponse();

    twiml.message('The Robots are coming! Head for the hills!');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());

    // let from = req.body.From;
    // let to = req.body.To;
    // let body = req.body.Body;

    // // if (body === 'bye') {
    // //     //sendMessage('Bye', from, to);
    // //     history = {};
    // // }

    // // if (Object.keys(history).length == 0 || !(from in history) ) { // First Message
    // //     //sendMessage('Hi', from, to);
    // //     //sendMessage(`What's the matter?`, from, to);
    // //     history[from] = [ body ]
    // // } else { // If he has a history
    // //     var messages = history[from];
    // //     var lastMessage = messages[messages.length - 1];

    // //     switch (body) {
    // //         case 'test 1':
    // //             //sendMessage(`This Work!!`, from, to);
    // //             break;
        
    // //         default:
    // //             //sendMessage(`Hello Again`, from, to);
    // //             //sendMessage(`This is your last message ${lastMessage}`, from, to);
    // //             break;
    // //     }

    // //     history[from] = [ body, ...messages ]
    // // }
  
    
    // client.messages.create({
    //     body: 'Hello',
    //     from: `${from}`,
    //     to: `${to}`
    //   });//.then(message => res.end());
    
});


app.listen(port, () => {
    console.log(`The server is working on the port ${port}`)
});
// -----------------------------------------

