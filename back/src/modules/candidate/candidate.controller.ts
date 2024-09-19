import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from "@nestjs/common";
import { CandidateService } from "./candidate.service";
import { CreateCandidateDto } from "../../dto/createCandidateDto";
import { ApiTags } from "@nestjs/swagger";
import { Candidate } from "src/entities/candidate.entity";
import { FileInterceptor } from "@nestjs/platform-express";


@ApiTags('Candidates')
@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // Interceptor para subir el archivo
  async create(
    @Body() createCandidateDto: CreateCandidateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.candidateService.create(createCandidateDto, file);
  }

  @Get()
  findAll() {
    return this.candidateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidateService.findOne(id);
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
