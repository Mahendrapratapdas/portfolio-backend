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
            subject: 'Thank you for contacting me',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 80%;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        background-color: #4CAF50;
                        padding: 20px;
                        border-radius: 10px 10px 0 0;
                    }
                    .header h1 {
                        color: #fff;
                        margin: 0;
                    }
                    .content {
                        padding: 20px;
                        text-align: center;
                    }
                    .content p {
                        font-size: 16px;
                        color: #333;
                        line-height: 1.5;
                    }
                    .footer {
                        text-align: center;
                        padding: 20px;
                        background-color: #4CAF50;
                        border-radius: 0 0 10px 10px;
                        color: #fff;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Thank You for Your Message!</h1>
                    </div>
                    <div class="content">
                        <p>We have received your message and will get back to you shortly.</p>
                        <p>Thank you for reaching out to us. We appreciate your patience.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 Mahendra Pratap Das. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>`,
          };
    
          // Email to you with user's details
          const mailOptionsToSelf = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New Message form Portfolio',
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