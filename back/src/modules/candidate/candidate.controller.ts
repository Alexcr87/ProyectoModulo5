import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CandidateService } from "./candidate.service";
import { CreateCandidateDto } from "../../dto/createCandidateDto";
import { ApiTags } from "@nestjs/swagger";
import { Candidate } from "src/entities/candidate.entity";

@ApiTags('Candidates')
@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidateService.create(createCandidateDto);
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
