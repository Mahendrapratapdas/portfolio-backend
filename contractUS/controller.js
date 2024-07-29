import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export default class ContactController{
    async contactUS(req, res) {
        const { email, message } = req.body;
    
        try {
          // Save the contact information to the database
        //   await ContactModel.create({ email, message });
    
          // Set up the email transporter
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
    
          // Email to the user
          const mailOptionsToUser = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting us',
            text: 'We have received your message and will get back to you shortly.',
          };
    
          // Email to you with user's details
          const mailOptionsToSelf = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New contact form submission',
            text: `Email: ${email}\nMessage: ${message}`,
          };
    
          // Send email to the user
          await transporter.sendMail(mailOptionsToUser);
    
          // Send email to yourself
          await transporter.sendMail(mailOptionsToSelf);
    
          // Respond with success
          res.status(200).send('Emails sent successfully');
        } catch (error) {
          console.error('Error sending emails:', error);
          res.status(500).send('An error occurred while sending emails');
        }
      }
}