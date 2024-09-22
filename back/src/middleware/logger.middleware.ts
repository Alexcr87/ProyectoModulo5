import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";



@Injectable()         // Esto es para middleware que no sean globales
export class LoggerMiddleware implements NestMiddleware{

  use(req: Request , res: Response , next: NextFunction ) {
    console.log(`Estás ejecutando un método ${req.method} en la ruta ${req.url}`)
    next()
  }
}

export function loggerGlobal(req: Request , res: Response , next: NextFunction){
  const currentDate = new Date()
   console.log(` Estás ejecutando un método ${req.method} en la ruta ${req.url}, fecha ${currentDate}`)
    next()
}