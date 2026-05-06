import { Resend } from "resend";

/**
 * Lazy-initialise Resend so the module can be imported without crashing
 * during build time when RESEND_API_KEY is not yet available.
 */
let _resend = null;
function getResend() {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing environment variable: RESEND_API_KEY");
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function row(label, value) {
  return `
    <tr>
      <td style="padding:12px 24px;border-bottom:1px solid #1f1f1f;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="color:#666;font-size:11px;letter-spacing:1px;text-transform:uppercase;width:40%">${label}</td>
            <td style="color:#fff;font-size:13px;text-align:right">${value}</td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function adminRow(label, value) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eee">
        <strong style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:1px">${label}:</strong>
        <span style="color:#111;font-size:14px;margin-left:12px">${value}</span>
      </td>
    </tr>`;
}

// ── Customer confirmation email ────────────────────────────────────────────────

export async function sendCustomerConfirmationEmail(appointment) {
  const {
    name,
    email,
    contact,
    service,
    city,
    gender,
    preferredTime,
    bookingId,
  } = appointment;

  const year = new Date().getFullYear();

  await getResend().emails.send({
    from: `Looks Salon <${process.env.RESEND_FROM_EMAIL}>`,
    to: email,
    subject: `✅ Your Appointment is Confirmed — Looks Salon`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Appointment Confirmation</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Georgia',serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
             style="background:#111;border:1px solid #2a2a2a;border-radius:4px;overflow:hidden;max-width:600px;width:100%">

        <!-- Header -->
        <tr>
          <td style="background:#000;padding:40px;text-align:center;border-bottom:2px solid #DEAB30">
            <p style="color:#DEAB30;font-size:11px;letter-spacing:6px;text-transform:uppercase;margin:0 0 12px">Since 1995</p>
            <h1 style="color:#fff;font-size:32px;margin:0;font-weight:400;letter-spacing:4px;text-transform:uppercase">LOOKS SALON</h1>
            <p style="color:#DEAB30;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:12px 0 0">Appointment Confirmed</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px">
            <p style="color:#999;font-size:14px;line-height:1.8;margin:0 0 24px">
              Dear <span style="color:#DEAB30;font-weight:bold">${name}</span>,
            </p>
            <p style="color:#999;font-size:14px;line-height:1.8;margin:0 0 32px">
              Thank you for booking with Looks Salon. Your appointment request has been received
              and we will confirm your slot shortly.
            </p>

            <!-- Booking details -->
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:2px;margin-bottom:32px">
              <tr>
                <td style="padding:20px 24px;border-bottom:1px solid #2a2a2a">
                  <p style="color:#DEAB30;font-size:10px;letter-spacing:4px;text-transform:uppercase;margin:0">Booking Details</p>
                </td>
              </tr>
              ${row("Booking ID", `#${bookingId}`)}
              ${row("Name", name)}
              ${row("Contact", contact)}
              ${row("Gender", gender)}
              ${row("Service", service)}
              ${row("City", city)}
              ${row("Preferred Time", preferredTime)}
            </table>

            <p style="color:#666;font-size:12px;line-height:1.8;margin:0 0 8px">
              ⏰ Our online booking service operates between
              <strong style="color:#DEAB30">10:00 a.m.</strong> and
              <strong style="color:#DEAB30">6:00 p.m.</strong>
            </p>
            <p style="color:#666;font-size:12px;line-height:1.8;margin:0 0 32px">
              📞 For immediate assistance call us at
              <strong style="color:#DEAB30">1800 212 56657</strong>
            </p>

            <div style="border-top:1px solid #2a2a2a;padding-top:24px">
              <p style="color:#555;font-size:11px;line-height:1.8;margin:0">
                Your data is safe with us. We will only use your details to process your salon
                booking and won't share them with third parties.
              </p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#000;padding:24px 40px;text-align:center;border-top:1px solid #2a2a2a">
            <p style="color:#444;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0">
              © ${year} Looks Salon. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });
}

// ── Admin notification email ───────────────────────────────────────────────────

export async function sendAdminNotificationEmail(appointment) {
  const {
    name,
    email,
    contact,
    service,
    city,
    gender,
    preferredTime,
    bookingId,
    createdAt,
  } = appointment;

  const submittedAt = new Date(createdAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;

  await getResend().emails.send({
    from: `Looks Salon Booking System <${process.env.RESEND_FROM_EMAIL}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🔔 New Booking: ${name} — ${service}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Booking</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
             style="background:#fff;border-radius:4px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);max-width:600px;width:100%">

        <!-- Header -->
        <tr>
          <td style="background:#DEAB30;padding:24px 32px">
            <h2 style="color:#000;margin:0;font-size:18px;letter-spacing:2px;text-transform:uppercase">
              New Appointment Request
            </h2>
            <p style="color:#000;margin:4px 0 0;font-size:12px;opacity:0.7">
              Booking ID: #${bookingId}
            </p>
          </td>
        </tr>

        <!-- Details -->
        <tr>
          <td style="padding:32px">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${adminRow("Name", name)}
              ${adminRow("Email", email)}
              ${adminRow("Contact", contact)}
              ${adminRow("Gender", gender)}
              ${adminRow("City", city)}
              ${adminRow("Service", service)}
              ${adminRow("Preferred Time", preferredTime)}
              ${adminRow("Submitted At", submittedAt)}
            </table>

            <div style="margin-top:28px">
              <a href="${dashboardUrl}"
                 style="background:#DEAB30;color:#000;padding:13px 28px;text-decoration:none;
                        font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;
                        border-radius:2px;display:inline-block">
                View in Dashboard →
              </a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #eee">
            <p style="color:#aaa;font-size:11px;margin:0">
              This is an automated notification from the Looks Salon booking system.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });
}
