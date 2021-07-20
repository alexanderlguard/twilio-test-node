// --------------------------------------------------------------
// TWILIO AUTH
const accountSid = 'AC5ae6684bd7945e1ad2515bde21437117';
const authToken = 'dfa4a86b64bec4978eb2ca251a8a4c50';
// --------------------------------------------------------------
// LIBS
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
// --------------------------------------------------------------
// OBJECTS
const client = new twilio(accountSid, authToken);
const MessagingResponse = twilio.twiml.MessagingResponse;
const app = express();
// --------------------------------------------------------------
// SET UP
app.use(bodyParser.urlencoded({extended: false}));
// --------------------------------------------------------------
// VARS
const port = process.env.PORT || 3000;
var messageHistory = {};
// --------------------------------------------------------------
// FUNCTIONS
var sendMessage = (to, msg, done) => {
    client.messages.create({
        body: `${msg}`,
        from: '+18324301022',
        to: `${to}`
    })
    .then(message => {
        console.log(`Message sent to ${to}`);
        done(message);
    });
}
// --------------------------------------------------------------
// URLS
app.get('/', (req, res) => {
    sendMessage('+18312247870', 'Pleas work!', () => {
        console.log('GG');
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.send('This is just a Test');
    });
});



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

// --------------------------------------------------------------
// START SERVER
app.listen(port, () => {
    console.log(`The server is working on the port ${port}`)
});