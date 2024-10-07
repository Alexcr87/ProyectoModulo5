import { transporter } from 'src/config/mail'; // Asegúrate de tener configurado el archivo transporter.
import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs'; // Necesitas importar EJS.
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
  async sendMail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  }

  async sendWelcomeEmail(
    email: string,
    name: string,
    password: string,
  ): Promise<void> {
    const templatePath = path.join(__dirname, '../../..', 'welcomeTemplate.ejs');
    let template: string;
  
    try {
      template = fs.readFileSync(templatePath, 'utf-8');
    } catch (error) {
      console.error('Error al leer la plantilla:', error);
      return; // Salir si hay un error
    }
  
    // Generar el enlace de cambio de contraseña
    const changePasswordLink = `URL DE CAMBIO DE CONTRASEÑA`;
  
    // Datos que se inyectarán en la plantilla
    const data = {
      title: 'Bienvenido a Gestión Electoral 2024',
      name,
      password,
      platform: 'Gestión Electoral 2024',
      changePasswordLink,  // Enlace de cambio de contraseña
    };
  
    // Renderizar el HTML usando la plantilla y los datos
    const htmlContent = ejs.render(template, data);

    // Enviar el correo
    await this.sendMail(
      email,
      '¡Bienvenido a Gestión Electoral 2024!',
      htmlContent,
    );
  }

}
