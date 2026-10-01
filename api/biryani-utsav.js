// Vercel serverless function — October Biryani Utsav bookings.
// Validates the submission, checks the biryani matches the weekday of the
// requested date, and emails the restaurant a branded confirmation.

const WEEKLY_MENU = {
  1: { label: 'Monday',    veg: 'Veg Dum Biryani',                 nonveg: 'Chicken Dum Biryani' },
  2: { label: 'Tuesday',   veg: 'Pachimirchi Paneer Biryani',      nonveg: 'Thalapakatti Goat Biryani' },
  3: { label: 'Wednesday', veg: 'Beach Style Paneer Pulav',        nonveg: 'Vijayawada Chicken Biryani' },
  4: { label: 'Thursday',  veg: 'Panasakkai (Jack Fruit) Biryani', nonveg: 'Pachimirchi Chicken Pulav' },
}

const UTSAV_START = '2026-10-01'
const UTSAV_END = '2026-10-31'

const DEFAULT_TO = 'hhbiryani.oma@gmail.com'
const DEFAULT_FROM = 'Hyderabad House Omaha <noreply@hhoma.com>'

const escape = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')

function renderHtml({ fullName, email, phone, dateDisplay, pickupTimeDisplay, biryani, kind }) {
  const kindTag = kind === 'veg'
    ? '<span style="background:#e6f2df;color:#4b8a3e;border:1px solid #b7dbaa;padding:3px 9px;border-radius:6px;font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;">Veg</span>'
    : '<span style="background:#fbe1d8;color:#c74a20;border:1px solid #f2b8a3;padding:3px 9px;border-radius:6px;font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;">Non-Veg</span>'

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>New Biryani Utsav Booking</title></head>
<body style="margin:0;padding:0;background:#f4ecdd;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1c1208;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4ecdd;padding:32px 16px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fdf9f1;border-radius:14px;overflow:hidden;box-shadow:0 12px 32px rgba(28,18,8,0.1);">

      <tr><td style="background:linear-gradient(135deg,#e07b18 0%,#c25a0f 100%);padding:32px 36px;text-align:left;">
        <div style="color:rgba(255,255,255,0.85);font-size:11px;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;margin-bottom:8px;">October Biryani Utsav</div>
        <div style="color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;line-height:1.15;">New Half-Tray Booking</div>
        <div style="color:rgba(255,255,255,0.85);font-size:13px;margin-top:6px;">from ${escape(fullName)}</div>
      </td></tr>

      <tr><td style="padding:28px 36px 8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="110" style="padding:10px 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8c7a63;font-weight:700;vertical-align:top;">Name</td>
            <td style="padding:10px 0;font-size:15px;color:#1c1208;vertical-align:top;">${escape(fullName)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8c7a63;font-weight:700;vertical-align:top;">Email</td>
            <td style="padding:10px 0;font-size:15px;vertical-align:top;"><a href="mailto:${escape(email)}" style="color:#e07b18;text-decoration:none;">${escape(email)}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8c7a63;font-weight:700;vertical-align:top;">Phone</td>
            <td style="padding:10px 0;font-size:15px;vertical-align:top;"><a href="tel:${escape(phone)}" style="color:#e07b18;text-decoration:none;">${escape(phone)}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8c7a63;font-weight:700;vertical-align:top;">Pickup Date</td>
            <td style="padding:10px 0;font-size:15px;color:#1c1208;vertical-align:top;font-weight:700;">${escape(dateDisplay)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8c7a63;font-weight:700;vertical-align:top;">Pickup Time</td>
            <td style="padding:10px 0;font-size:15px;color:#1c1208;vertical-align:top;font-weight:700;">${escape(pickupTimeDisplay)}</td>
          </tr>
        </table>
      </td></tr>

      <tr><td style="padding:8px 36px 24px;">
        <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8c7a63;font-weight:700;margin-bottom:12px;">Biryani Selected</div>
        <div style="background:#f8f0dc;border-left:3px solid #e07b18;border-radius:0 8px 8px 0;padding:20px 22px;">
          <div style="margin-bottom:8px;">${kindTag}</div>
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:700;color:#1c1208;margin-top:4px;">${escape(biryani)}</div>
          <div style="font-size:12px;color:#8c7a63;margin-top:6px;">Half-tray, designed for gatherings.</div>
        </div>
      </td></tr>

      <tr><td style="padding:0 36px 28px;">
        <div style="background:linear-gradient(135deg,#f6e0bb 0%,#f0cf96 100%);border:1px solid #e2b06b;border-radius:10px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:14px;">
          <div>
            <div style="font-size:10px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#8f5a0f;">Collect at Pickup</div>
            <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:800;color:#8f3b00;margin-top:4px;line-height:1;">$50.00</div>
          </div>
          <div style="font-size:12px;color:#8f5a0f;font-weight:700;text-align:right;max-width:180px;line-height:1.4;">Payable in cash or card when the customer picks up.</div>
        </div>
      </td></tr>

      <tr><td style="padding:0 36px 32px;">
        <a href="tel:${escape(phone)}" style="display:inline-block;background:#e07b18;color:#fff;text-decoration:none;padding:12px 22px;border-radius:100px;font-weight:700;font-size:14px;letter-spacing:0.03em;">Call ${escape(fullName.split(' ')[0] || 'customer')}</a>
        <div style="font-size:12px;color:#8c7a63;margin-top:12px;">Or hit Reply — the reply goes to their email.</div>
      </td></tr>

      <tr><td style="background:#1a0e04;padding:22px 36px;text-align:center;color:rgba(251,248,240,0.55);font-size:11px;line-height:1.7;">
        <div style="color:#e07b18;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;font-size:11px;margin-bottom:6px;">Hyderabad House Omaha</div>
        <div>2537 S 174th Plz, Omaha, NE 68130 · +1 (402) 505-9209</div>
        <div style="margin-top:10px;color:rgba(251,248,240,0.4);">October Biryani Utsav booking · This inbox is unmonitored, please reply directly to the sender above.</div>
      </td></tr>

    </table>
  </td></tr>
</table></body></html>`
}

function renderText({ fullName, email, phone, dateDisplay, pickupTimeDisplay, biryani, kind }) {
  return [
    `New October Biryani Utsav booking from ${fullName}`,
    '',
    `Name:    ${fullName}`,
    `Email:   ${email}`,
    `Phone:   ${phone}`,
    `Date:    ${dateDisplay}`,
    `Time:    ${pickupTimeDisplay}`,
    `Biryani: ${biryani} (${kind === 'veg' ? 'Veg' : 'Non-Veg'})`,
    `Total:   $50.00 — collect at pickup (cash or card)`,
    '',
    'Half-tray, designed for gatherings.',
    '',
    '-------',
    `Reply directly to this email to respond to ${fullName.split(' ')[0]}.`,
    'Sent via https://www.hhoma.com/biryani-utsav',
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
    phone = '', date = '', pickupTime = '',
    biryani = '', botcheck = '',
  } = body

  if (botcheck) return res.status(200).json({ success: true })

  const errors = []
  if (!firstName.trim()) errors.push('First name is required.')
  if (!lastName.trim()) errors.push('Last name is required.')
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('A valid email is required.')
  if (phone.replace(/\D/g, '').length !== 10) errors.push('Phone number must be 10 digits.')

  // Date must be an ISO YYYY-MM-DD inside the Utsav window and land on Mon–Thu.
  let dateDisplay = ''
  let menu = null
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    errors.push('Please select a valid pickup date.')
  } else if (date < UTSAV_START || date > UTSAV_END) {
    errors.push('Pickup date must fall within the October Utsav window.')
  } else {
    const parsed = new Date(date + 'T00:00:00')
    const dow = parsed.getDay()
    menu = WEEKLY_MENU[dow]
    if (!menu) {
      errors.push('The Utsav runs Monday through Thursday only.')
    } else {
      dateDisplay = parsed.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    }
  }

  // Pickup time must be HH:MM in 15-min increments between 11:00 and 20:45.
  let pickupTimeDisplay = ''
  if (!/^\d{2}:\d{2}$/.test(pickupTime)) {
    errors.push('Please select a pickup time.')
  } else {
    const [hh, mm] = pickupTime.split(':').map(Number)
    const totalMin = hh * 60 + mm
    if (totalMin < 11 * 60 || totalMin > 20 * 60 + 45 || mm % 15 !== 0) {
      errors.push('Pickup time must be between 11:00 AM and 8:45 PM in 15-min slots.')
    } else {
      const period = hh >= 12 ? 'PM' : 'AM'
      const h12 = hh === 12 ? 12 : hh > 12 ? hh - 12 : hh
      pickupTimeDisplay = `${h12}:${String(mm).padStart(2, '0')} ${period}`
    }
  }

  // Biryani must match the weekday's veg or non-veg option (guards against tampered payloads).
  let kind = null
  if (menu) {
    if (biryani === menu.veg) kind = 'veg'
    else if (biryani === menu.nonveg) kind = 'nonveg'
    else errors.push(`That biryani is not available on ${menu.label}.`)
  }

  if (errors.length) return res.status(400).json({ success: false, error: errors.join(' ') })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[utsav] Missing RESEND_API_KEY')
    return res.status(500).json({ success: false, error: 'Server is not configured to send email yet. Please call us directly.' })
  }
  const to = process.env.CONTACT_TO || DEFAULT_TO
  const from = process.env.CONTACT_FROM || DEFAULT_FROM
  const fullName = `${firstName} ${lastName}`.trim()

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from, to: [to], reply_to: email,
        subject: `Biryani Utsav booking · ${dateDisplay} at ${pickupTimeDisplay} · ${fullName}`,
        html: renderHtml({ fullName, email, phone, dateDisplay, pickupTimeDisplay, biryani, kind }),
        text: renderText({ fullName, email, phone, dateDisplay, pickupTimeDisplay, biryani, kind }),
      }),
    })
    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      console.error('[utsav] Resend error:', r.status, data)
      return res.status(502).json({ success: false, error: 'Sorry, we could not send your booking right now. Please try again or call us at +1 (402) 505-9209.' })
    }
    return res.status(200).json({ success: true, id: data.id })
  } catch (err) {
    console.error('[utsav] Network error:', err)
    return res.status(500).json({ success: false, error: 'Network error. Please check your connection and try again.' })
  }
}
