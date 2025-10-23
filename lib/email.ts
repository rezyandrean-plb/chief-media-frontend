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

export async function sendForgotPasswordEmail(to: string, name: string, url: string) {
  const subject = 'Reset your password - Chief Media'
  const html = `
    <div style="font-family: Arial, sans-serif; line-height:1.6; max-width:600px; margin:0 auto; padding:20px;">
      <div style="text-align:center; margin-bottom:30px;">
        <h1 style="color:#273F4F; margin:0;">Chief Media</h1>
      </div>
      
      <div style="background:#f8f9fa; padding:20px; border-radius:8px; margin-bottom:20px;">
        <h2 style="color:#273F4F; margin-top:0;">Password Reset Request</h2>
        <p style="margin-bottom:0;">Hi ${name},</p>
        <p>We received a request to reset your password for your Chief Media account. If you made this request, click the button below to reset your password.</p>
      </div>
      
      <div style="text-align:center; margin:30px 0;">
        <a href="${url}" style="display:inline-block;background:#F37521;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:16px;">Reset My Password</a>
      </div>
      
      <div style="background:#fff3cd; border:1px solid #ffeaa7; padding:15px; border-radius:6px; margin:20px 0;">
        <p style="margin:0; color:#856404;"><strong>Security Notice:</strong> This link will expire in 1 hour for your security.</p>
      </div>
      
      <div style="margin-top:30px; padding-top:20px; border-top:1px solid #eee;">
        <p style="color:#666; font-size:14px; margin:0;">If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
        <p style="color:#666; font-size:14px; margin:10px 0 0 0;">If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="color:#F37521; font-size:14px; word-break:break-all; margin:5px 0 0 0;">${url}</p>
      </div>
      
      <div style="text-align:center; margin-top:30px; padding-top:20px; border-top:1px solid #eee;">
        <p style="color:#999; font-size:12px; margin:0;">© 2024 Chief Media. All rights reserved.</p>
        <p style="color:#999; font-size:12px; margin:5px 0 0 0;">This email was sent to ${to}</p>
      </div>
    </div>
  `
  await sendEmail({ to, subject, html })
}




