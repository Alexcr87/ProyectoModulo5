import { transporter } from 'src/config/mail'; 
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  async sendMail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  }

  async sendWelcomeEmail(email: string, name: string) {
    const htmlContent1=
   `<h1>Estimado/a ${name},</h1>
    <p>¡Bienvenido/a a Gestion Electoral 2024! Estamos encantados de tenerte con nosotros.</p>
    <p>Para comenzar a utilizar tu cuenta, por favor solo opta por el email y password que haz ingresado al registrarte</p>
    <p>Atentamente,</p>
    <p><strong>El Equipo de Gestion Electoral 2024</strong></p>`;
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: '¡Bienvenido Gestion Electoral 2024!',
      template: './welcome',
      text: `Estimado/a ${name},

¡Bienvenido/a a Gestion Electoral 2024! Estamos encantados de tenerte con nosotros.

Para comenzar a utilizar tu cuenta, por favor solo opta por el email y password que haz ingresado al registrarte.

Atentamente,
El Equipo de Gestion Electoral 2024`,
      context: { name },
      html: htmlContent1
    };

    await transporter.sendMail(mailOptions);
  }

  async sendPasswordEmail(email: string, name: string, password: string): Promise<void> {
    const htmlContent = `
    <h1>Estimado/a ${name},</h1>
    <p>¡Bienvenido/a a Gestion Electoral 2024! Estamos encantados de tenerte con nosotros.</p>
    <p>Para comenzar a utilizar tu cuenta, por favor usa la siguiente contraseña temporal para tu primer inicio de sesión:</p>
    <p><strong>Contraseña Temporal:</strong> ${password}</p>
    <p>Por razones de seguridad, te solicitamos que cambies esta contraseña temporal inmediatamente después de iniciar sesión por primera vez.</p>
    <h2>¿Cómo cambiar tu contraseña?</h2>
    <ol>
      <li>Inicia sesión en tu cuenta.</li>
      <li>Dirígete a la sección de 'Configuración' o 'Mi Perfil'.</li>
      <li>Selecciona la opción 'Cambiar Contraseña'.</li>
      <li>Sigue las instrucciones para establecer una nueva contraseña.</li>
    </ol>
    <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactar a nuestro equipo de soporte en <a href='mailto:gestionelectoral2024m5@gmail.com'>gestionelectoral2024m5@gmail.com</a>.</p>
    <p>Gracias por elegir Gestion Electoral 2024. ¡Esperamos que disfrutes de nuestra plataforma!</p>
    <p>Atentamente,</p>
    <p><strong>El Equipo de Gestion Electoral 2024</strong></p>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Bienvenido a Gestion Electoral 2024 - Información Importante de Acceso',
      text:`¡Bienvenido/a a Gestion Electoral 2024! Estamos encantados de tenerte con nosotros.

  Para comenzar a utilizar tu cuenta, por favor usa la siguiente contraseña temporal para tu primer inicio de sesión:

  Contraseña Temporal: ${password}

  Por razones de seguridad, te solicitamos que cambies esta contraseña temporal inmediatamente después de iniciar sesión por primera vez.

  ¿Cómo cambiar tu contraseña?
  1. Inicia sesión en tu cuenta.
  2. Dirígete a la sección de 'Configuración' o 'Mi Perfil'.
  3. Selecciona la opción 'Cambiar Contraseña'.
  4. Sigue las instrucciones para establecer una nueva contraseña.

  Si tienes alguna pregunta o necesitas asistencia, no dudes en contactar a nuestro equipo de soporte en gestion electoral 2024.

  Gracias por elegir Gestion Electoral 2024. ¡Esperamos que disfrutes de nuestra plataforma!

  Atentamente,
  El Equipo de Gestion Electoral 2024`,
       html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
  }

}