const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendAppointmentConfirmation = async (to, appointmentDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Appointment Confirmed - ${appointmentDetails.serviceName}`,
    html: `
      <h2>Appointment Confirmation</h2>
      <p>Dear ${appointmentDetails.clientName},</p>
      <p>Your appointment has been successfully scheduled!</p>
      <h3>Details:</h3>
      <ul>
        <li>Service: ${appointmentDetails.serviceName}</li>
        <li>Date: ${appointmentDetails.date}</li>
        <li>Time: ${appointmentDetails.time}</li>
        <li>Duration: ${appointmentDetails.duration} minutes</li>
        <li>Type: ${appointmentDetails.sessionType}</li>
        <li>Cost: KES ${appointmentDetails.cost}</li>
      </ul>
      <p>Regards,<br>Prof. Peter Odera</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

exports.sendPaymentReceipt = async (to, paymentDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Payment Receipt',
    html: `
      <h2>Payment Receipt</h2>
      <p>Dear ${paymentDetails.clientName},</p>
      <p>Thank you for your payment.</p>
      <h3>Payment Details:</h3>
      <ul>
        <li>Amount: KES ${paymentDetails.amount}</li>
        <li>Method: ${paymentDetails.method}</li>
        <li>Status: ${paymentDetails.status}</li>
        <li>Date: ${new Date().toLocaleString()}</li>
      </ul>
      <p>Regards,<br>Prof. Peter Odera</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

exports.sendCancellationEmail = async (to, appointmentDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Appointment Cancelled',
    html: `
      <h2>Appointment Cancellation</h2>
      <p>Dear ${appointmentDetails.clientName},</p>
      <p>Your appointment has been cancelled.</p>
      <h3>Cancelled Appointment:</h3>
      <ul>
        <li>Service: ${appointmentDetails.serviceName}</li>
        <li>Date: ${appointmentDetails.date}</li>
        <li>Time: ${appointmentDetails.time}</li>
      </ul>
      <p>To reschedule, please book another appointment on our website.</p>
      <p>Regards,<br>Prof. Peter Odera</p>
    `
  };

  return transporter.sendMail(mailOptions);
};
