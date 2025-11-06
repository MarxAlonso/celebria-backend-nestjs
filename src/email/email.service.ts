import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Invitation } from '../database/entities/invitation.entity';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    // This is a placeholder for email implementation
    // In a real application, you would integrate with an email service like SendGrid, Mailgun, or AWS SES
    
    const smtpConfig = {
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      user: this.configService.get('SMTP_USER'),
      pass: this.configService.get('SMTP_PASS'),
    };

    console.log('Email configuration:', smtpConfig);
    console.log(`Sending email to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${content}`);
    
    // Simulate email sending
    return Promise.resolve();
  }

  async sendInvitationEmail(to: string, eventName: string, invitationLink: string): Promise<void> {
    const subject = `Invitación para ${eventName}`;
    const content = `
      <h1>¡Has sido invitado a ${eventName}!</h1>
      <p>Por favor confirma tu asistencia haciendo clic en el siguiente enlace:</p>
      <a href="${invitationLink}">Confirmar asistencia</a>
    `;
    
    return this.sendEmail(to, subject, content);
  }

  async sendRsvpConfirmationEmail(to: string, eventName: string, status: string): Promise<void> {
    const subject = `Confirmación de asistencia - ${eventName}`;
    const content = `
      <h1>¡Gracias por confirmar tu asistencia!</h1>
      <p>Tu respuesta para ${eventName} ha sido registrada como: <strong>${status}</strong></p>
    `;
    
    return this.sendEmail(to, subject, content);
  }

  async sendPaymentConfirmationEmail(to: string, amount: number, orderId: string): Promise<void> {
    const subject = 'Confirmación de pago';
    const content = `
      <h1>¡Pago confirmado!</h1>
      <p>Tu pago por S/${amount} ha sido procesado exitosamente.</p>
      <p>Número de orden: ${orderId}</p>
    `;
    
    return this.sendEmail(to, subject, content);
  }

  // Envía invitación (placeholder). Reemplazar por SendGrid / nodemailer en producción.
  async sendInvitation(to: string, eventName: string, invitation: Invitation): Promise<void> {
    // Aquí puedes integrar un proveedor real (SendGrid, SES, nodemailer, etc.)
    // Por ahora solo log para desarrollo/local:
    console.log('=== Enviando invitación (placeholder) ===');
    console.log(`Para: ${to}`);
    console.log(`Evento: ${eventName}`);
    console.log('Invitación:', invitation);
    console.log('=========================================');
    return;
  }
}