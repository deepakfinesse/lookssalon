import { Resend } from "resend";

let _resend = null;
function getResend() {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

// ── Brand tokens ───────────────────────────────────────────────────────────────
const GOLD     = "#A9254B";
const BLACK    = "#000000";
const WHITE    = "#ffffff";
const PAGE_BG  = "#f4f4f4";   // outer wrapper — light grey
const CARD_BG  = "#ffffff";   // email card — pure white
const ROW_BG   = "#fafafa";   // table row background
const ROW_ALT  = "#f5f5f5";   // table heading row
const BORDER   = "#e8e8e8";   // light border
const MUTED    = "#888888";   // label / muted text
const BODY_TXT = "#444444";   // body paragraph text
const DIM      = "#aaaaaa";   // footer dim text
const FONT     = "Arial, 'Helvetica Neue', Helvetica, sans-serif";

const LOGO_URL   = "https://www.lookssalon.in/public/images/Big_Logo.svg";
const SITE_URL   = "https://www.lookssalon.in";
const FB_URL     = "https://www.facebook.com/Looksunisexsalon/";
const IG_URL     = "https://www.instagram.com/looksunisexsalon/";
const TW_URL     = "https://x.com/looksindia";
const PHONE      = "1800 212 56657";
const PHONE_HREF = "tel:180021256657";

// ── Shared header — black band, centered logo, gold border, tagline ────────────

function emailHeader(tagline = "") {
  return `
  <tr>
    <td align="center"
        style="background:${BLACK};padding:20px 40px 20px;border-bottom:3px solid ${GOLD}">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">

        <!-- Logo — centered -->
        <tr>
          <td align="center" style="padding-bottom:${tagline ? "1px" : "0"}">
            <!--[if !mso]><!-->
            <a href="${SITE_URL}" target="_blank"
               style="display:inline-block;text-decoration:none;line-height:0">
              <img src="${LOGO_URL}"
                   alt="Looks Salon"
                   width="150" height="auto"
                   style="display:block;width:150px;max-width:150px;
                          height:auto;border:0;outline:none" />
            </a>
            <!--<![endif]-->
            <!--[if mso]>
            <a href="${SITE_URL}" style="text-decoration:none">
              <span style="font-family:${FONT};font-size:24px;font-weight:400;
                           letter-spacing:5px;color:${WHITE};text-transform:uppercase">
                LOOKS SALON
              </span>
            </a>
            <![endif]-->
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

// ── Shared footer — white bg, social icons + links + copyright ─────────────────

function emailFooter(year) {
  return `
  <tr>
    <td style="background:${WHITE};padding:20px 40px;border-top:2px solid ${GOLD}">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">

        <!-- Social icon circles -->
        <tr>
          <td align="center" style="padding-bottom:16px">
            <table cellpadding="0" cellspacing="0" role="presentation">
              <tr>

                <!-- Facebook -->
                <td style="padding:0 8px">
                  <a href="${FB_URL}" target="_blank" style="text-decoration:none">
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td align="center" valign="middle"
                            style="width:36px;height:36px;
                                   background:${GOLD};border-radius:50%">
                          <span style="font-family:${FONT};font-size:14px;
                                       font-weight:bold;color:${BLACK};
                                       line-height:36px;display:block;
                                       text-align:center">f</span>
                        </td>
                      </tr>
                    </table>
                  </a>
                </td>

                <!-- Instagram -->
                <td style="padding:0 8px">
                  <a href="${IG_URL}" target="_blank" style="text-decoration:none">
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td align="center" valign="middle"
                            style="width:36px;height:36px;
                                   background:${GOLD};border-radius:50%">
                          <span style="font-family:${FONT};font-size:11px;
                                       font-weight:bold;color:${BLACK};
                                       line-height:36px;display:block;
                                       text-align:center">in</span>
                        </td>
                      </tr>
                    </table>
                  </a>
                </td>

                <!-- X / Twitter -->
                <td style="padding:0 8px">
                  <a href="${TW_URL}" target="_blank" style="text-decoration:none">
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td align="center" valign="middle"
                            style="width:36px;height:36px;
                                   background:${GOLD};border-radius:50%">
                          <span style="font-family:${FONT};font-size:13px;
                                       font-weight:bold;color:${BLACK};
                                       line-height:36px;display:block;
                                       text-align:center">&#120143;</span>
                        </td>
                      </tr>
                    </table>
                  </a>
                </td>

              </tr>
            </table>
          </td>
        </tr>

        
        <!-- Copyright + phone -->
        <tr>
          <td align="center">
            <p style="margin:0 0 1px;font-family:${FONT};font-size:11px;
                      color:${DIM};letter-spacing:2px">
              &copy; ${year}&nbsp;
              <a href="${SITE_URL}" target="_blank"
                 style="color:${GOLD};text-decoration:none">Looks Salon</a>.
              All rights reserved.
            </p>
            
          </td>
        </tr>

      </table>
    </td>
  </tr>`;
}

// ── Detail row — label left, value right ──────────────────────────────────────

function detailRow(label, value, isLast = false) {
  const border = isLast ? "" : `border-bottom:1px solid ${BORDER};`;
  return `
  <tr>
    <td width="40%"
        style="padding:13px 20px;${border}
               font-family:${FONT};font-size:11px;color:${MUTED};
               letter-spacing:1px;text-transform:uppercase;vertical-align:top;
               background:${ROW_BG}">
      ${label}
    </td>
    <td width="60%"
        style="padding:13px 20px;${border}
               font-family:${FONT};font-size:13px;color:#171717;
               text-align:right;vertical-align:top;
               background:${WHITE}">
      ${value}
    </td>
  </tr>`;
}

// ── Outer email shell ─────────────────────────────────────────────────────────

function emailShell(bodyRows) {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${PAGE_BG};
             -webkit-text-size-adjust:100%;-ms-text-size-adjust:100%">

<table width="100%" cellpadding="0" cellspacing="0" role="presentation"
       style="background-color:${PAGE_BG};padding:40px 16px">
  <tr>
    <td align="center">

      <table width="600" cellpadding="0" cellspacing="0" role="presentation"
             style="max-width:600px;width:100%;background:${CARD_BG};
                    border:1px solid ${BORDER};border-radius:4px;overflow:hidden;
                    box-shadow:0 2px 12px rgba(0,0,0,0.08)">
        ${bodyRows}
      </table>

    </td>
  </tr>
</table>

</body>
</html>`;
}

// ── Customer confirmation email ────────────────────────────────────────────────

export async function sendCustomerConfirmationEmail(appointment) {
  const {
    name, email, contact, service, otherService,
    city, salonName, gender, preferredTime,
    appointmentDate, bookingId,
  } = appointment;
  const serviceLabel = service === "Other" && otherService ? `Other — ${otherService}` : service;
  const year = new Date().getFullYear();

  const fmtApptDate = appointmentDate
    ? new Date(appointmentDate + "T00:00:00").toLocaleDateString("en-IN", {
        day: "2-digit", month: "long", year: "numeric",
      })
    : "—";

  const body = `
    ${emailHeader("Appointment Confirmed")}

    <!-- GREETING -->
    <tr>
      <td style="padding:20px 40px 0">
        <p style="margin:0 0 10px;font-family:${FONT};font-size:15px;
                  color:#171717;line-height:1.8">
          Dear <strong style="color:${GOLD}">${name}</strong>,
        </p>
        <p style="margin:0 0 8px;font-family:${FONT};font-size:14px;
                  color:${BODY_TXT};line-height:1.8">
          Thank you for choosing Looks Salon. Your appointment request has been
          received and our team will confirm your slot shortly.
        </p>
      </td>
    </tr>

    <!-- BOOKING DETAILS TABLE -->
    <tr>
      <td style="padding:24px 40px 0">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
               style="border:1px solid ${BORDER};border-radius:2px;overflow:hidden">

          <!-- Table heading -->
          <tr>
            <td colspan="2"
                style="padding:13px 20px;background:${ROW_ALT};
                       border-bottom:1px solid ${BORDER}">
              <p style="margin:0;font-family:${FONT};font-size:10px;
                        color:${GOLD};letter-spacing:4px;text-transform:uppercase">
                Booking Details
              </p>
            </td>
          </tr>

         
          ${detailRow("Name",             name)}
          ${detailRow("Contact",          contact)}
          ${detailRow("Gender",           gender)}
          ${detailRow("Service",          serviceLabel)}
          ${detailRow("City",             city)}
          ${detailRow("Salon",            salonName || "—")}
          ${detailRow("Appointment Date", fmtApptDate)}
          ${detailRow("Preferred Time",   preferredTime, true)}

        </table>
      </td>
    </tr>

    <!-- INFO STRIP -->
    <tr>
      <td style="padding:20px 40px 20px">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
               style="background:${ROW_ALT};border:1px solid ${BORDER};border-radius:2px">
          <tr>
            <td style="padding:13px 20px;border-bottom:1px solid ${BORDER}">
              <p style="margin:0;font-family:${FONT};font-size:12px;
                        color:${BODY_TXT};line-height:1.7">
                ⏰&nbsp; Bookings operate between
                <strong style="color:${GOLD}">10:00 a.m.</strong> and
                <strong style="color:${GOLD}">9:00 p.m.</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:13px 20px">
              <p style="margin:0;font-family:${FONT};font-size:12px;
                        color:${BODY_TXT};line-height:1.7">
                📞&nbsp; Need help? Call us at&nbsp;
                <a href="${PHONE_HREF}"
                   style="color:${GOLD};text-decoration:none;font-weight:bold">
                  ${PHONE}
                </a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    

    ${emailFooter(year)}
  `;

  await getResend().emails.send({
    from:    `Looks Salon <${process.env.RESEND_FROM_EMAIL}>`,
    to:      email,
    subject: `✅ Appointment Request Received — Looks Salon`,
    html:    emailShell(body),
  });
}

// ── Admin notification email ───────────────────────────────────────────────────

export async function sendAdminNotificationEmail(appointment) {
  const {
    name, email, contact, service, otherService,
    city, salonName, gender, preferredTime,
    appointmentDate, bookingId, createdAt,
  } = appointment;
  const serviceLabel = service === "Other" && otherService ? `Other — ${otherService}` : service;
  const year = new Date().getFullYear();

  const fmtApptDate = appointmentDate
    ? new Date(appointmentDate + "T00:00:00").toLocaleDateString("en-IN", {
        day: "2-digit", month: "long", year: "numeric",
      })
    : "—";

  const submittedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day:      "2-digit",
    month:    "long",
    year:     "numeric",
  });
  const submittedTime = new Date(createdAt).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour:     "2-digit",
    minute:   "2-digit",
    hour12:   true,
  });

  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;

  const body = `
    ${emailHeader("New Appointment Request")}

    <!-- DETAILS TABLE -->
    <tr>
      <td style="padding:28px 40px 20px">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
               style="border:1px solid ${BORDER};border-radius:2px;overflow:hidden">

          <!-- Table heading -->
          <tr>
            <td colspan="2"
                style="padding:13px 20px;background:${ROW_ALT};
                       border-bottom:1px solid ${BORDER}">
              <p style="margin:0;font-family:${FONT};font-size:10px;
                        color:${GOLD};letter-spacing:4px;text-transform:uppercase">
                Customer &amp; Booking Details
              </p>
            </td>
          </tr>

          
          
          ${detailRow("Name",     name)}
          ${detailRow("Email",
            `<a href="mailto:${email}"
                style="color:${GOLD};text-decoration:none">${email}</a>`)}
          ${detailRow("Contact",
            `<a href="tel:${contact}"
                style="color:${GOLD};text-decoration:none">${contact}</a>`)}
          ${detailRow("Gender",           gender)}
          ${detailRow("City",             city)}
          ${detailRow("Salon",            salonName || "—")}
          ${detailRow("Service",          serviceLabel)}
          ${detailRow("Appointment Date", fmtApptDate)}
          ${detailRow("Preferred Time",   preferredTime, true)}
          ${detailRow("Submitted",
            `${submittedDate}, <strong style="color:${GOLD}">${submittedTime} IST</strong>`)}

        </table>
      </td>
    </tr>

    <!-- DIVIDER before footer -->
    <tr>
      <td style="padding:0 40px">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="border-top:1px solid ${BORDER};font-size:0;line-height:0">&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>

    ${emailFooter(year)}
  `;

  await getResend().emails.send({
    from:    `Looks Salon Bookings <${process.env.RESEND_FROM_EMAIL}>`,
    to:      process.env.ADMIN_EMAIL,
    subject: `🔔 New Booking`,
    html:    emailShell(body),
  });
}

// ── Franchise: customer confirmation ──────────────────────────────────────────

export async function sendFranchiseCustomerEmail(inquiry) {
  const { name, email, occupation, contact, location, inquiryId } = inquiry;
  const year = new Date().getFullYear();

  const body = `
    ${emailHeader("Franchise Inquiry Received")}

    <tr>
      <td style="padding:20px 40px 0">
        <p style="margin:0 0 10px;font-family:${FONT};font-size:15px;
                  color:#171717;line-height:1.8">
          Dear <strong style="color:${GOLD}">${name}</strong>,
        </p>
        <p style="margin:0 0 1px;font-family:${FONT};font-size:14px;
                  color:${BODY_TXT};line-height:1.8">
          Thank you for your interest in becoming a Looks Salon franchise partner.
          We have received your inquiry and our franchise team will get in touch with
          you shortly.
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding:24px 40px 20px">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
               style="border:1px solid ${BORDER};border-radius:2px;overflow:hidden">
          <tr>
            <td colspan="2"
                style="padding:13px 20px;background:${ROW_ALT};
                       border-bottom:1px solid ${BORDER}">
              <p style="margin:0;font-family:${FONT};font-size:10px;
                        color:${GOLD};letter-spacing:4px;text-transform:uppercase">
                Your Inquiry Details
              </p>
            </td>
          </tr>
          
          ${detailRow("Name",       name)}
          ${detailRow("Occupation", occupation)}
          ${detailRow("Contact",    contact)}
          ${detailRow("Location",   location, true)}
        </table>
      </td>
    </tr>

    

    ${emailFooter(year)}
  `;

  await getResend().emails.send({
    from:    `Looks Salon <${process.env.RESEND_FROM_EMAIL}>`,
    to:      email,
    subject: `✅ Franchise Inquiry Received — Looks Salon`,
    html:    emailShell(body),
  });
}

// ── Franchise: admin notification ─────────────────────────────────────────────

export async function sendFranchiseAdminEmail(inquiry) {
  const { name, email, contact, occupation, location, message, inquiryId, createdAt } = inquiry;
  const year = new Date().getFullYear();

  const submittedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata", day: "2-digit", month: "long", year: "numeric",
  });
  const submittedTime = new Date(createdAt).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true,
  });

  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/franchise`;

  const body = `
    ${emailHeader("New Franchise Inquiry")}

    

    <tr>
      <td style="padding:28px 40px 20px">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
               style="border:1px solid ${BORDER};border-radius:2px;overflow:hidden">
          <tr>
            <td colspan="2"
                style="padding:13px 20px;background:${ROW_ALT};
                       border-bottom:1px solid ${BORDER}">
              <p style="margin:0;font-family:${FONT};font-size:10px;
                        color:${GOLD};letter-spacing:4px;text-transform:uppercase">
                Inquiry Details
              </p>
            </td>
          </tr>
          
          ${detailRow("Date",     submittedDate)}
          ${detailRow("Time",
            `<strong style="color:${GOLD}">${submittedTime} IST</strong>`)}
          ${detailRow("Name",     name)}
          ${detailRow("Occupation", occupation)}
          ${detailRow("Email",
            `<a href="mailto:${email}"
                style="color:${GOLD};text-decoration:none">${email}</a>`)}
          ${detailRow("Contact",
            `<a href="tel:${contact}"
                style="color:${GOLD};text-decoration:none">${contact}</a>`)}
          ${detailRow("Location", location)}
          ${detailRow("Message",  message || "—", true)}
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding:0 40px">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="border-top:1px solid ${BORDER};font-size:0;line-height:0">&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>

    ${emailFooter(year)}
  `;

  await getResend().emails.send({
    from:    `Looks Salon Franchise <${process.env.RESEND_FROM_EMAIL}>`,
    to:      process.env.ADMIN_EMAIL,
    subject: `🏪 New Franchise Inquiry`,
    html:    emailShell(body),
  });
}

// ── Contact: customer confirmation ────────────────────────────────────────────

export async function sendContactCustomerEmail(inquiry) {
  const { name, email, phone, subject } = inquiry;
  const year = new Date().getFullYear();

  const body = `
    ${emailHeader("Message Received")}

    <tr>
      <td style="padding:20px 40px 0">
        <p style="margin:0 0 10px;font-family:${FONT};font-size:15px;
                  color:#171717;line-height:1.8">
          Dear <strong style="color:${GOLD}">${name}</strong>,
        </p>
        <p style="margin:0 0 1px;font-family:${FONT};font-size:14px;
                  color:${BODY_TXT};line-height:1.8">
          Thank you for getting in touch with Looks Salon. We have received your
          message and our team will get back to you as soon as possible.
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding:24px 40px 20px">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
               style="border:1px solid ${BORDER};border-radius:2px;overflow:hidden">
          <tr>
            <td colspan="2"
                style="padding:13px 20px;background:${ROW_ALT};
                       border-bottom:1px solid ${BORDER}">
              <p style="margin:0;font-family:${FONT};font-size:10px;
                        color:${GOLD};letter-spacing:4px;text-transform:uppercase">
                Your Message Details
              </p>
            </td>
          </tr>
          ${detailRow("Name",    name)}
          ${detailRow("Phone",   phone)}
          ${detailRow("Subject", subject, true)}
        </table>
      </td>
    </tr>

    ${emailFooter(year)}
  `;

  await getResend().emails.send({
    from:    `Looks Salon <${process.env.RESEND_FROM_EMAIL}>`,
    to:      email,
    subject: `✅ Message Received — Looks Salon`,
    html:    emailShell(body),
  });
}

// ── Contact: admin notification ───────────────────────────────────────────────

export async function sendContactAdminEmail(inquiry) {
  const { name, email, phone, subject, query, createdAt } = inquiry;
  const year = new Date().getFullYear();

  const submittedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata", day: "2-digit", month: "long", year: "numeric",
  });
  const submittedTime = new Date(createdAt).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true,
  });

  const body = `
    ${emailHeader("New Contact Message")}

    <tr>
      <td style="padding:28px 40px 20px">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
               style="border:1px solid ${BORDER};border-radius:2px;overflow:hidden">
          <tr>
            <td colspan="2"
                style="padding:13px 20px;background:${ROW_ALT};
                       border-bottom:1px solid ${BORDER}">
              <p style="margin:0;font-family:${FONT};font-size:10px;
                        color:${GOLD};letter-spacing:4px;text-transform:uppercase">
                Message Details
              </p>
            </td>
          </tr>
          ${detailRow("Date",    submittedDate)}
          ${detailRow("Time",
            `<strong style="color:${GOLD}">${submittedTime} IST</strong>`)}
          ${detailRow("Name",    name)}
          ${detailRow("Email",
            `<a href="mailto:${email}"
                style="color:${GOLD};text-decoration:none">${email}</a>`)}
          ${detailRow("Phone",
            `<a href="tel:${phone}"
                style="color:${GOLD};text-decoration:none">${phone}</a>`)}
          ${detailRow("Subject", subject)}
          ${detailRow("Query",   query, true)}
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding:0 40px">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="border-top:1px solid ${BORDER};font-size:0;line-height:0">&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>

    ${emailFooter(year)}
  `;

  await getResend().emails.send({
    from:    `Looks Salon Contact <${process.env.RESEND_FROM_EMAIL}>`,
    to:      process.env.ADMIN_EMAIL,
    subject: `📩 New Contact Message — ${subject}`,
    html:    emailShell(body),
  });
}