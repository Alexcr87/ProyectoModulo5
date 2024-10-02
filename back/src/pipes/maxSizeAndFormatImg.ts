import { BadRequestException, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from "@nestjs/common";
import { error } from "console";


export class MinSizeAndFormat extends ParseFilePipe {
constructor(){
    super({
        validators: [
            new MaxFileSizeValidator ({
                maxSize : 300*1024,
            }),
            new FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp)$/,
            }),
        ],      
    })
}
}