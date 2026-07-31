// Vercel serverless function — receives the contact form POST,
// validates it, and dispatches a branded HTML email via Resend.
//
// Env vars required in Vercel dashboard (Project → Settings → Environment Variables):
//   RESEND_API_KEY   — created in the Resend dashboard
//   CONTACT_TO       — destination inbox (default: hhbiryani.dm@gmail.com)
//   CONTACT_FROM     — sender address (default: 'Hyderabad House <noreply@hhoma.com>')

const TOPIC_LABELS = {
  'party-hall': 'Party Hall Booking',
  catering: 'Catering',
  feedback: 'Feedback',
  other: 'Other',
}

const DEFAULT_TO = 'hhbiryani.dm@gmail.com'
const DEFAULT_FROM = 'Hyderabad House Omaha <noreply@hhoma.com>'

const escape = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const paragraph = (msg = '') =>
  escape(msg)
    .split(/\n{2,}/)
    .map(p => `<p style="margin:0 0 14px;line-height:1.65;color:#3a2a18;font-size:15px;">${p.replace(/\n/g, '<br />')}</p>`)
    .join('')

function renderHtml({ fullName, email, phone, topicLabel, message }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>New Enquiry — Hyderabad House Omaha</title>
</head>
<body style="margin:0;padding:0;background:#f4ecdd;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1c1208;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4ecdd;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fdf9f1;border-radius:14px;overflow:hidden;box-shadow:0 12px 32px rgba(28,18,8,0.1);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#e07b18 0%,#c25a0f 100%);padding:32px 36px;text-align:left;">
              <div style="color:rgba(255,255,255,0.85);font-size:11px;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;margin-bottom:8px;">New Website Enquiry</div>
              <div style="color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;line-height:1.15;">${escape(topicLabel)}</div>
              <div style="color:rgba(255,255,255,0.85);font-size:13px;margin-top:6px;">from ${escape(fullName)}</div>
            </td>
          </tr>

          <!-- Fields -->
          <tr>
            <td style="padding:28px 36px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="90" style="padding:10px 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8c7a63;font-weight:700;vertical-align:top;">Name</td>
                  <td style="padding:10px 0;font-size:15px;color:#1c1208;vertical-align:top;">${escape(fullName)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8c7a63;font-weight:700;vertical-align:top;">Email</td>
                  <td style="padding:10px 0;font-size:15px;vertical-align:top;"><a href="mailto:${escape(email)}" style="color:#e07b18;text-decoration:none;">${escape(email)}</a></td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8c7a63;font-weight:700;vertical-align:top;">Phone</td>
                  <td style="padding:10px 0;font-size:15px;color:#1c1208;vertical-align:top;">${phone ? `<a href="tel:${escape(phone)}" style="color:#e07b18;text-decoration:none;">${escape(phone)}</a>` : '<span style="color:#8c7a63;">(not provided)</span>'}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8c7a63;font-weight:700;vertical-align:top;">Topic</td>
                  <td style="padding:10px 0;font-size:15px;color:#1c1208;vertical-align:top;">${escape(topicLabel)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:8px 36px 32px;">
              <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8c7a63;font-weight:700;margin-bottom:12px;">Message</div>
              <div style="background:#f8f0dc;border-left:3px solid #e07b18;border-radius:0 8px 8px 0;padding:20px 22px;">
                ${paragraph(message)}
              </div>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:0 36px 32px;">
              <a href="mailto:${escape(email)}?subject=Re:%20${encodeURIComponent(`Your enquiry to Hyderabad House Omaha`)}"
                style="display:inline-block;background:#e07b18;color:#fff;text-decoration:none;padding:12px 22px;border-radius:100px;font-weight:700;font-size:14px;letter-spacing:0.03em;">
                Reply to ${escape(fullName.split(' ')[0] || 'sender')}
              </a>
              <div style="font-size:12px;color:#8c7a63;margin-top:12px;">Or just hit Reply — it goes straight to their inbox.</div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1a0e04;padding:22px 36px;text-align:center;color:rgba(251,248,240,0.55);font-size:11px;line-height:1.7;">
              <div style="color:#e07b18;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;font-size:11px;margin-bottom:6px;">Hyderabad House Omaha</div>
              <div>2537 S 174th Plz, Omaha, NE 68130 · +1 (402) 505-9209</div>
              <div style="margin-top:10px;color:rgba(251,248,240,0.4);">Sent via the contact form on hhoma.com. This inbox is unmonitored, please reply directly to the sender above.</div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function renderText({ fullName, email, phone, topicLabel, message }) {
  return [
    `New ${topicLabel} enquiry from ${fullName}`,
    '',
    `Name:  ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone || '(not provided)'}`,
    `Topic: ${topicLabel}`,
    '',
    'Message',
    '-------',
    message,
    '',
    '-------',
    `Reply directly to this email to respond to ${fullName.split(' ')[0] || 'the sender'}.`,
    'Sent via https://www.hhoma.com/contact',
  ].join('\n')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const body = req.body || {}
  const {
    firstName = '', lastName = '', email = '',
    phone = '', topic = '', message = '', botcheck = '',
  } = body

  // Honeypot — bots fill every input; real users leave botcheck empty.
  if (botcheck) return res.status(200).json({ success: true })

  // Validation
  const errors = []
  if (!firstName.trim()) errors.push('First name is required.')
  if (!lastName.trim()) errors.push('Last name is required.')
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('A valid email is required.')
  if (!topic) errors.push('Please select a topic.')
  if (!message.trim() || message.trim().length < 5) errors.push('Please include a message.')
  if (message.length > 5000) errors.push('Message is too long.')
  if (errors.length) {
    return res.status(400).json({ success: false, error: errors.join(' ') })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] Missing RESEND_API_KEY env var')
    return res.status(500).json({ success: false, error: 'Server is not configured to send email yet. Please call us directly.' })
  }

  const to = process.env.CONTACT_TO || DEFAULT_TO
  const from = process.env.CONTACT_FROM || DEFAULT_FROM

  const topicLabel = TOPIC_LABELS[topic] || String(topic)
  const fullName = `${firstName} ${lastName}`.trim()

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `${topicLabel} enquiry from ${fullName}`,
        html: renderHtml({ fullName, email, phone, topicLabel, message }),
        text: renderText({ fullName, email, phone, topicLabel, message }),
      }),
    })

    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      console.error('[contact] Resend error:', r.status, data)
      return res.status(502).json({
        success: false,
        error: 'Sorry, we could not send your message right now. Please try again in a moment or call us at +1 (402) 505-9209.',
      })
    }

    return res.status(200).json({ success: true, id: data.id })
  } catch (err) {
    console.error('[contact] Network error:', err)
    return res.status(500).json({
      success: false,
      error: 'Network error. Please check your connection and try again, or call us at +1 (402) 505-9209.',
    })
  }
}
