import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    content: string;
    filename: string;
    type: string;
    disposition: string;
  }>;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    const msg: any = {
      to: params.to,
      from: params.from,
      subject: params.subject,
    };

    if (params.html) {
      msg.html = params.html;
    }
    if (params.text) {
      msg.text = params.text;
    }
    if (params.attachments) {
      msg.attachments = params.attachments;
    }

    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

// Forward subscriber email to owner
export async function forwardSubscriberEmail(
  subscriberEmail: string,
  subscriberName: string,
  region: string
): Promise<boolean> {
  const emailParams: EmailParams = {
    to: 'survivalcarr@gmail.com',
    from: 'noreply@budgetsurvivalskills.com',
    subject: `New PDF Download Subscriber - ${region.toUpperCase()}`,
    html: `
      <h2>New Budget Survival Skills Subscriber</h2>
      <p><strong>Email:</strong> ${subscriberEmail}</p>
      <p><strong>Name:</strong> ${subscriberName}</p>
      <p><strong>Region:</strong> ${region.toUpperCase()}</p>
      <p><strong>Downloaded:</strong> ${region.toUpperCase()} Budget Survival Skills Guide</p>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
    `,
    text: `
      New Budget Survival Skills Subscriber
      
      Email: ${subscriberEmail}
      Name: ${subscriberName}
      Region: ${region.toUpperCase()}
      Downloaded: ${region.toUpperCase()} Budget Survival Skills Guide
      Date: ${new Date().toLocaleDateString()}
    `
  };

  return await sendEmail(emailParams);
}

// Send PDF to subscriber
export async function sendPDFToSubscriber(
  subscriberEmail: string,
  subscriberName: string,
  region: string,
  pdfContent: string
): Promise<boolean> {
  const regionNames = {
    us: 'United States',
    uk: 'United Kingdom', 
    au: 'Australia',
    ca: 'Canada'
  };

  const emailParams: EmailParams = {
    to: subscriberEmail,
    from: 'noreply@budgetsurvivalskills.com',
    subject: `Your ${regionNames[region as keyof typeof regionNames]} Budget Survival Skills Guide`,
    html: `
      <h2>Thank you for downloading your Budget Survival Skills Guide!</h2>
      <p>Hi ${subscriberName},</p>
      
      <p>Thank you for subscribing to Budget Survival Skills! Your personalized <strong>${regionNames[region as keyof typeof regionNames]} Budget Survival Skills Guide</strong> is attached to this email.</p>
      
      <p>This comprehensive guide includes:</p>
      <ul>
        <li>Emergency fund strategies specific to ${regionNames[region as keyof typeof regionNames]}</li>
        <li>Debt payoff methods that work in your region</li>
        <li>Government benefits and programs available to you</li>
        <li>Local investment and savings opportunities</li>
        <li>Side hustle ideas for your market</li>
      </ul>
      
      <p>Visit our website at <a href="https://${process.env.REPLIT_DEV_DOMAIN || 'budgetsurvivalskills.com'}">Budget Survival Skills</a> for more financial tips and guides.</p>
      
      <p>Best regards,<br>
      The Budget Survival Skills Team</p>
    `,
    text: `
      Thank you for downloading your Budget Survival Skills Guide!
      
      Hi ${subscriberName},
      
      Thank you for subscribing to Budget Survival Skills! Your personalized ${regionNames[region as keyof typeof regionNames]} Budget Survival Skills Guide is attached to this email.
      
      This comprehensive guide includes:
      - Emergency fund strategies specific to ${regionNames[region as keyof typeof regionNames]}
      - Debt payoff methods that work in your region
      - Government benefits and programs available to you
      - Local investment and savings opportunities
      - Side hustle ideas for your market
      
      Visit our website for more financial tips and guides.
      
      Best regards,
      The Budget Survival Skills Team
    `,
    attachments: [
      {
        content: pdfContent,
        filename: `${region.toUpperCase()}-Budget-Survival-Skills-Guide.pdf`,
        type: 'application/pdf',
        disposition: 'attachment'
      }
    ]
  };

  return await sendEmail(emailParams);
}

export async function sendContactFormEmail(
  contactData: { name: string; email: string; subject: string; message: string }
): Promise<boolean> {
  const emailParams: EmailParams = {
    to: 'survivalcarr@gmail.com', // Your personal email
    from: 'noreply@budgetsurvivalskills.com',
    subject: `Contact Form: ${contactData.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${contactData.name} (${contactData.email})</p>
      <p><strong>Subject:</strong> ${contactData.subject}</p>
      <hr>
      <h3>Message:</h3>
      <p>${contactData.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>This message was sent from the Budget Survival Skills contact form.</em></p>
    `,
    text: `
New Contact Form Submission

From: ${contactData.name} (${contactData.email})
Subject: ${contactData.subject}

Message:
${contactData.message}

This message was sent from the Budget Survival Skills contact form.
    `
  };

  return await sendEmail(emailParams);
}