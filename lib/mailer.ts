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
 * Resend client instance
 */
const resend = new Resend(process.env.RESEND_API_KEY);

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

    logger.info({ id: response.data?.id }, 'Email sent successfully');
    return { success: true, id: response.data?.id };
  } catch (error) {
    logger.error({ error }, 'Error sending email');
    throw error;
  }
}

