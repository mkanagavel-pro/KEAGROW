import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      'Email is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS in your .env.'
    );
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

export async function sendInquiryConfirmationEmail(inquiry) {
  if (!inquiry.email) {
    throw new Error('This inquiry has no email address to send to.');
  }

  const fromAddress = process.env.FROM_EMAIL || process.env.SMTP_USER;
  const t = getTransporter();

  await t.sendMail({
    from: `"KEAGROW" <${fromAddress}>`,
    to: inquiry.email,
    subject: 'We received your project inquiry — KEAGROW',
    text: `Hi ${inquiry.name || 'there'},

Thanks for reaching out to KEAGROW about your ${inquiry.projectType || 'project'}.
We've received your inquiry and our team will review it and get back to you shortly.

Your message:
"${inquiry.message || ''}"

— KEAGROW Team
Grow Your Business With Us.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color:#111;">
        <h2 style="color:#0f172a; margin-bottom: 4px;">KEAGROW</h2>
        <p style="color:#64748b; margin-top:0;">Grow Your Business With Us.</p>
        <p>Hi ${inquiry.name || 'there'},</p>
        <p>Thanks for reaching out to KEAGROW about your <strong>${inquiry.projectType || 'project'}</strong>.</p>
        <p>We've received your inquiry and our team will review it and get back to you shortly.</p>
        <blockquote style="border-left: 3px solid #10b981; margin: 16px 0; padding-left: 12px; color:#555;">
          ${inquiry.message || ''}
        </blockquote>
        <p style="margin-top:24px;">— KEAGROW Team<br/><em>Grow Your Business With Us.</em></p>
      </div>
    `,
  });
}
