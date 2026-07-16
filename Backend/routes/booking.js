const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const getBookingEmailTemplate = require('../utils/emailTemplate');

router.post('/reserve', async (req, res) => {
  const { userEmail, userName, ticketType, price } = req.body;

  if (!userEmail) {
    return res.status(400).json({ message: 'User email is required' });
  }

  try {
    // Generate random entry key
    const entryKey = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    // Generate mock payment data
    const paymentId = 'PAY-' + Math.floor(Math.random() * 900000 + 100000);
    const dateObj = new Date();
    const paymentDate = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString();

    // Send immediate success response to make the popup lightning fast
    res.status(200).json({ 
      message: 'Booking confirmed! Your pass is ready.',
      paymentId: paymentId
    });

    // Fire-and-forget: run the slow Ethereal email generation in the background
    setImmediate(async () => {
      try {
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, 
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });

        const templateData = {
          userName: userName || 'Festival Goer',
          paymentId: paymentId,
          paymentDate: paymentDate,
          amount: price || 0,
          paymentMethod: 'Credit Card (Stripe)',
          ticketType: ticketType || 'Standard',
          entryKey: entryKey,
          workshopsCount: ticketType === 'Pro' ? 6 : (ticketType === 'VIP' ? 'All' : 2)
        };

        const htmlContent = getBookingEmailTemplate(templateData);

        let info = await transporter.sendMail({
          from: '"SkillSwap Festival" <tickets@skillswap.com>',
          to: userEmail,
          subject: "🎉 Booking Confirmed! Your SkillSwap Festival Entry Pass is Ready",
          html: htmlContent,
        });

        console.log("Background email sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      } catch (err) {
        console.error("Background email failed to send (Ethereal network error):", err);
      }
    });

  } catch (error) {
    console.error('Error booking:', error);
    res.status(500).json({ message: 'Failed to process booking' });
  }
});

module.exports = router;
