import { Injectable } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    dotenvConfig({ path: './.env.development' });
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile(buffer: Buffer, originalName?: string): Promise<string> {
    const options: UploadApiOptions = {
      folder: 'candidates',
      public_id: originalName ? originalName.split('.')[0] : undefined, // No permitir puntos en public_id
      resource_type: 'auto',
    };

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        },
      );
      stream.end(buffer);
    });
  }
}
