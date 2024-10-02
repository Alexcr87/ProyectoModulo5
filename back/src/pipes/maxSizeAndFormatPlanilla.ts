import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from "@nestjs/common";

  
  export class ExcelFilePipe extends ParseFilePipe {
    constructor() {
      super({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2000000, 
          }),
          new FileTypeValidator({
            fileType: /(xls|xlsx)$/,
        }),
        ],
    })
  }
};