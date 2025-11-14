import { Resend } from 'resend';
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        }
      : undefined,
});

/**
 * Lazily create the Resend client to avoid build-time failures when the API key
 * is not available (e.g., local development without secrets configured).
 */
function createResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      logger.warn('RESEND_API_KEY is not set. Skipping email delivery and logging payload instead.');
      return null;
    }

    throw new Error('RESEND_API_KEY is required to send emails.');
  }

  return new Resend(apiKey);
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  brief?: string;
}

/**
 * Send contact form email via Resend
 */
export async function sendContactEmail(data: ContactFormData) {
  try {
    const { name, email, message, brief } = data;
    const resend = createResendClient();

    if (!resend) {
      logger.info({ data }, 'Contact email skipped because RESEND_API_KEY is missing.');
      return { success: false };
    }

    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'hello@tenchiflux.com',
      to: process.env.RESEND_TO_EMAIL || 'team@growvia.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        ${brief ? `<p><strong>Project Brief:</strong></p><p>${brief.replace(/\n/g, '<br>')}</p>` : ''}
        <hr>
        <p style="color: #666; font-size: 12px;">Sent from Tenchi Flux Studios contact form</p>
      `,
    });

    if (response.error) {
      logger.error({ error: response.error }, 'Failed to send email');
      throw new Error('Failed to send email');
    }

    const emailId = response.data?.id;
    logger.info({ id: emailId }, 'Email sent successfully');
    return { success: true, id: emailId };
  } catch (error) {
    logger.error({ error }, 'Error sending email');
    throw error;
  }
}

