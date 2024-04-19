
import { EmailTemplate } from '@/components/ui/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(email,otp) {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'OTP verification',
      react: EmailTemplate({otp}),
    });

    return {success: true, message: 'Email is send successfully'};
  } catch (error) {
    return {success: false, message: 'Email is not send successfully'};

  }
}
