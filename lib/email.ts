import sgMail from '@sendgrid/mail'

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY)
}

export async function sendEmail(options: {
  to: string
  subject: string
  html?: string
  text?: string
  from?: string
}) {
  if (!SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY is not set')
  }

  const fromEmail = options.from ?? FROM_EMAIL
  if (!fromEmail) {
    throw new Error('FROM_EMAIL is not set')
  }

  // Ensure SendGrid receives non-empty content fields
  const safeHtml = (options.html && options.html.trim().length > 0) ? options.html : '<p>&nbsp;</p>'
  const safeText = (options.text && options.text.trim().length > 0)
    ? options.text
    : 'Please view this message in an HTML-capable email client.'

  const msg = {
    to: options.to,
    from: fromEmail,
    subject: options.subject,
    text: safeText,
    html: safeHtml,
  }

  await sgMail.send(msg)
}

export async function sendWelcomeEmail(to: string, name: string) {
  const subject = 'Welcome to KW Singapore'
  const html = `
    <div style="font-family: Arial, sans-serif; line-height:1.6">
      <h2>Welcome, ${name}!</h2>
      <p>Thanks for signing up. We're excited to have you on board.</p>
      <p>— KW Singapore</p>
    </div>
  `
  await sendEmail({ to, subject, html })
}

export async function sendSetPasswordEmail(to: string, name: string, url: string) {
  const subject = 'Set up your password'
  const html = `
    <div style="font-family: Arial, sans-serif; line-height:1.6">
      <h2>Hi ${name}, welcome!</h2>
      <p>Click the button below to set your password and complete your signup.</p>
      <p><a href="${url}" style="display:inline-block;background:#111827;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Set your password</a></p>
      <p>Or copy this link into your browser:<br/>${url}</p>
      <p>This link expires in 1 hour.</p>
    </div>
  `
  await sendEmail({ to, subject, html })
}




