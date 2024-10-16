//  import { Controller, Get, Res } from '@nestjs/common';
//  import { Response } from 'express';

// @Controller()
//  export class RedirectController {
//    @Get()
//    redirectToFrontend(@Res() res: Response) {
//     res.redirect(`${process.env.REDIRECT_AUTH0}/callback`);
//   }

//   @Get("logouts")
//   redirectToFrontendLogout(@Res() res: Response){
//     res.redirect(`${process.env.REDIRECT_AUTH0}`);
//   }
//  }