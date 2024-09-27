import { Controller, Post, Body } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { VoteDto } from "src/dto/vote.dto";

@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  async vote(@Body() voteDto: VoteDto): Promise<string> {
    return this.voteService.votar(voteDto.userId, voteDto.campaignId, voteDto.candidateId);
  }
}
