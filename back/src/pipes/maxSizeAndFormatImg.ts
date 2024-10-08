import {
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
    BadRequestException,
} from '@nestjs/common';

export class MinSizeAndFormat extends ParseFilePipe {
constructor() {
    super({
        validators: [
            new MaxFileSizeValidator({
                maxSize: 300 * 1024, // 300KB
            }),
            new FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp)$/i,
            }),
        ],
        errorHttpStatusCode: 400,
    });
}

async transform(value: any) {
    try {
        return await super.transform(value);
    } catch (error) {


        if (error.message.includes('expected type is')) {
            throw new BadRequestException('El archivo debe ser una imagen en formato JPG, JPEG, PNG o WEBP.');
        }

        if (error.message.includes('expected size is')) {
            throw new BadRequestException('El archivo debe ser menor de 300KB.');
        }


        throw new BadRequestException('Error desconocido al procesar el archivo.');
    }
}
}
