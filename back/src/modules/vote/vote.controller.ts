import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { VoteDto } from "src/dto/vote.dto";

@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  async vote(@Body() voteDto: VoteDto): Promise<string> {
    return this.voteService.votar(voteDto.userId, voteDto.candidateId);
  }

  @Get('/campaign/:campaignId/candidates')
    async getCandidatesWithVotes(@Param('campaignId') campaignId: string) {
      return this.voteService.getCandidatesWithVotes(campaignId);
    }

    @Get('/campaign/:campaignId/total-users')
    async getTotalUsersInCampaign(@Param('campaignId') campaignId: string) {
      return this.voteService.getTotalUsersInCampaign(campaignId);
    }
}