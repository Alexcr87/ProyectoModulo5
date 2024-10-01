import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class RedirectController {
  @Get()
  redirectToFrontend(@Res() res: Response) {
    res.redirect('http://localhost:4000/callback');
  }
}