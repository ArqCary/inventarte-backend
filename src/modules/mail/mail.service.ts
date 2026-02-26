import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly resend: Resend;
  private readonly from: string;

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(configService.get<string>('RESEND_API_KEY'));
    this.from = configService.get<string>('RESEND_FROM')!;
  }

  async sendRoleRequestNotification(masterEmail: string, employeeName: string) {
    console.log('Mande el correo al master');
    
    await this.resend.emails.send({
      from: this.from,
      to: masterEmail,
      subject: 'Nueva solicitud de cambio de rol',
      html: `
        <h2>Nueva solicitud de cambio de rol</h2>
        <p>El empleado <strong>${employeeName}</strong> ha solicitado un cambio de rol a Administrador.</p>
        <p>Ingresa al sistema para aprobar o rechazar la solicitud.</p>
      `,
    });
  }

  async sendRoleRequestResult(
    employeeName: string,
    employeeEmail: string,
    approved: boolean,
  ) {
    await this.resend.emails.send({
      from: this.from,
      to: employeeEmail,
      subject: approved
        ? 'Tu solicitud de cambio de rol fue aprobada'
        : 'Tu solicitud de cambio de rol fue rechazada',
      html: approved
        ? `
          <h2>¡Felicitaciones ${employeeName}!</h2>
          <p>Tu solicitud de cambio de rol a <strong>Administrador</strong> fue aprobada.</p>
          <p>Ya puedes iniciar sesión nuevamente para acceder a tus nuevos permisos.</p>
        `
        : `
          <h2>Hola ${employeeName}</h2>
          <p>Tu solicitud de cambio de rol fue rechazada por el Administrador Maestro.</p>
          <p>Si tienes dudas, comunícate con tu supervisor.</p>
        `,
    });
  }
}
