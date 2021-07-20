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
var sendMessage = (to, msg, done = undefined) => {
    client.messages.create({
        body: `${msg}`,
        from: '+18324301022',
        to: `${to}`
    })
    .then(message => {
        console.log(`Message sent to ${to}`);
        if (done !== undefined) done(message);
    });
}
// --------------------------------------------------------------
// URLS
app.get('/', (req, res) => {
    let message = req.query.message || 'Hello world!';
    
    sendMessage('+18312247870', message, () => {
        res.send('This is just a Test to send message');
    });
});



app.post('/sms', (req, res) => {
    let clientPhoneNumber = req.body.From;
    let to = req.body.To;
    let body = req.body.Body;

    if (body === 'bye') {
        sendMessage(clientPhoneNumber, 'We hope to have been of help', () => {
            messageHistory = {};
            res.end('DONE');
        });
    } else {
        if (Object.keys(messageHistory).length == 0 || !(clientPhoneNumber in messageHistory) ) { // First Message
            sendMessage(clientPhoneNumber, 'We see you\'re a new Member', () => {
                messageHistory[clientPhoneNumber] = [ body ];
                res.end('DONE');
            });
        } else {
            var messages = messageHistory[clientPhoneNumber];
            var lastMessage = messages[messages.length - 1];

            switch (body.toLowerCase()) {
                case 'test 1':
                    sendMessage(clientPhoneNumber, 'You haved to buy bitcoins', () => {
                        messageHistory[clientPhoneNumber] = [ ...messages, body];
                        res.end('DONE');
                    });
                    break;

                case 'last':
                    sendMessage(clientPhoneNumber, `Your last message was: ${lastMessage}`, () => {
                        messageHistory[clientPhoneNumber] = [ ...messages, body];
                        res.end('DONE');
                    });
                    break;
            
                default:
                    sendMessage(clientPhoneNumber, 'We can\'t hear you', () => {
                        messageHistory[clientPhoneNumber] = [ ...messages, body];
                        res.end('DONE');
                    });
                    break;
            }
        }
    }

    // if (Object.keys(history).length == 0 || !(from in history) ) { // First Message
    //     //sendMessage('Hi', from, to);
    //     //sendMessage(`What's the matter?`, from, to);
    //     history[from] = [ body ]
    // } else { // If he has a history
    //     var messages = history[from];
    //     var lastMessage = messages[messages.length - 1];

    //     switch (body) {
    //         case 'test 1':
    //             //sendMessage(`This Work!!`, from, to);
    //             break;
        
    //         default:
    //             //sendMessage(`Hello Again`, from, to);
    //             //sendMessage(`This is your last message ${lastMessage}`, from, to);
    //             break;
    //     }

    //     history[from] = [ body, ...messages ]
    // }
});

// --------------------------------------------------------------
// START SERVER
app.listen(port, () => {
    console.log(`The server is working on the port ${port}`)
});