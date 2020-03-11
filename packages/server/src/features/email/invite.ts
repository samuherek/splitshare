const sgMail = require('@sendgrid/mail');

export interface Email {
  sendBillInvite: typeof sendBillInvite;
}

// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };

// sgMail.send(msg)

type Options = {
  toEmail: string;
  billName: string;
  fromName: string;
};

async function sendBillInvite({ toEmail, billName, fromName }: Options) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

  const msg = {
    to: toEmail,
    from: 'support@splitshare.me',
    templateId: 'd-847d57850d9f410ea3f22cc890cb4226',
    dynamicTemplateData: {
      billName,
      fromName,
      acceptUrl: `${process.env.FRONTEND_URL || ''}${process.env.INVITE_URL ||
        ''}?bill_name=${billName}&from_name=${fromName}&to_email=${toEmail}`,
    },
  };

  return sgMail.send(msg);
}

export default {
  sendBillInvite,
};
