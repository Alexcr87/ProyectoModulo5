import { Global, Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Global()
@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
