const express = require('express')
const app = express()
var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Test Port: ${port}`)
})


// const http = require('http');
// const express = require('express');
// const MessagingResponse = require('twilio').twiml.MessagingResponse;

// const app = express();

// app.post('/sms', (req, res) => {
//     const twiml = new MessagingResponse();
  
//     twiml.message('The Robots are coming! Head for the hills!');
  
//     res.writeHead(200, {'Content-Type': 'text/xml'});
//     res.end(twiml.toString());
//   });
  
//   http.createServer(app).listen(1337, () => {
//     console.log('Express server listening on port 1337');
//   });

// const accountSid = 'AC5ae6684bd7945e1ad2515bde21437117';
// const authToken = '1b80f25529a2b51f03fff3d5b60005fe';
// const client = require('twilio')(accountSid, authToken);

// // client.messages
// //   .create({
// //      body: 'This is a message for test',
// //      from: '+18324301022',
// //      to: '+18312247870'
// //    })
// //   .then(message => console.log(message.sid));