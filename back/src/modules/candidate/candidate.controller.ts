import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from '../../dto/createCandidate.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Candidate } from 'src/entities/candidate.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinSizeAndFormat } from 'src/pipes/maxSizeAndFormatImg';

@ApiTags('Candidates')
@ApiExtraModels(CreateCandidateDto)
@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // Interceptor para manejar archivos
  @ApiConsumes('multipart/form-data') // Indica que usa multipart/form-data
  @ApiOperation({ summary: 'Create candidate with file' })
  @ApiBody({
    description: 'Formulario para crear un candidato y subir un archivo',
    schema: {
      type: 'object',
      properties: {
        postulation: { type: 'string', example: 'Presidente' },
        list: { type: 'string', example: 'Lista 123' },
        campaignDescription: { type: 'string', example: 'Propuesta educativa' },
        proposals: {
          type: 'array',
          items: { type: 'string' },
          example: ['Educación gratuita', 'Plazas de empleo'],
        },
        userId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000',
        },
        file: {
          type: 'string',
          format: 'binary',
          description: 'Archivo del candidato (JPG)',
        },
      },
    },
  })

  async create(
    @Body() createCandidateDto: CreateCandidateDto,
    @UploadedFile(new MinSizeAndFormat()) file: Express.Multer.File,
  ) {
    return this.candidateService.create(createCandidateDto, file);
  }

  @Get()
  findAll() {
    return this.candidateService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.candidateService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Candidate>) {
    return this.candidateService.updateCandidate(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.candidateService.deleteCandidate(id);
    return { message: 'Candidate deleted successfully' };
  }
}
