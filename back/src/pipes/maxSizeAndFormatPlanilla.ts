import {
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelFilePipe extends ParseFilePipe implements PipeTransform {
  private expectedHeaders = ['name', 'dni', 'email', 'address', 'city', 'country'];

  constructor() {
    super({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 2000000, // 2MB
          message: 'El archivo es demasiado grande; debe ser menor a 2MB',
        }),
      ],
    });
  }

  async transform(file: Express.Multer.File) {

    const allowedMimeTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'application/xls', // .xls
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('El archivo debe ser un Excel (.xls o .xlsx)');
    }


    const parsedFile = await super.transform(file);


    const workbook = XLSX.readFile(parsedFile.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];


    const data: string[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];


    const headerRow = data[0];


    if (headerRow.length !== this.expectedHeaders.length) {
      throw new BadRequestException(`El archivo debe contener exactamente ${this.expectedHeaders.length} columnas.`);
    }


    const isValid = this.expectedHeaders.every((header, index) => header === headerRow[index]);

    if (!isValid) {
      throw new BadRequestException('El archivo debe contener las columnas exactas: name, dni, email, address, city, country');
    }

    return parsedFile; 
  }
}