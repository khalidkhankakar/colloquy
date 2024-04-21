
import { EmailTemplate } from '@/components/ui/email-template';
import { Resend } from 'resend';
// process.env.RESEND_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(email,otp, fname='', lname='') {
  try {
    await resend.emails.send({
      from: 'Colloquy <onboarding@resend.dev>',
      to: [email],
      subject: 'OTP verification',
      react: EmailTemplate({otp, fname, lname}),
    });
    return {success: true, message: 'Email is send successfully'};
  } catch (error) {
    return {success: false, message: 'Email is not send successfully'};
  }
}
