let { Router } = require("express")
let router = Router()
const nodemailer = require('nodemailer');


router.post('/send-email', async (req, res) => {
   const { recipient, subject, text } = req.body;
 
   // Set up Nodemailer transporter
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'orelschoo@gmail.com',
        pass: '05271241',
      },
   });
 
   try {
     // Send email
     const info = await transporter.sendMail({
       from: 'orelschoo@gmail.com',
       to: recipient,
       subject: "subject",
       text: "text",
     });
 
     console.log('Email sent:', info.messageId);
 
     res.status(200).send('Email sent successfully');
   } catch (error) {
     console.error('Error sending email:', error);
 
     res.status(500).send('Error sending email');
   }
 });


module.exports = router