 import { Controller, Get, Res } from '@nestjs/common';
 import { Response } from 'express';

@Controller()
 export class RedirectController {
   @Get()
   async redirectToFrontend(@Res() res: Response) {
    try {
      // Realiza la solicitud a /auth/protected para obtener los datos del usuario
      const protectedDataResponse = await fetch(`${process.env.REDIRECT_AUTH0}/auth/protected`, {
        method: 'GET',
        credentials: 'include',  // Incluye las cookies o credenciales
      });
  
      if (protectedDataResponse.ok) {
        const userData = await protectedDataResponse.json();
  
        // Redirige al frontend pasando los datos del usuario en la URL
        const redirectUrl = `${process.env.REDIRECT_AUTH0}/callback?name=${userData.name}&email=${userData.email}&sid=${userData.sid}`;
        return res.redirect(redirectUrl);
      } else {
        // Maneja el error si no se pueden obtener los datos del usuario
        console.error('Error fetching protected data:', protectedDataResponse.statusText);
        return res.status(400).send('Error fetching protected data');
      }
    } catch (error) {
      console.error('Error in redirectToFrontend:', error);
      return res.status(500).send('Internal server error');
    }
  }

  @Get("logouts")
  redirectToFrontendLogout(@Res() res: Response){
    res.redirect(`${process.env.REDIRECT_AUTH0}`);
  }
 }