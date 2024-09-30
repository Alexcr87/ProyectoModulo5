import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { VoteDto } from "src/dto/vote.dto";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('votes') // Agrupamos los endpoints bajo la categoría 'votes'
@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Vote registered successfully.' })
  async vote(@Body() voteDto: VoteDto): Promise<string> {
    return this.voteService.votar(voteDto.userId, voteDto.campaignId, voteDto.candidateId);
  }

  @Get('/campaign/:campaignId/candidates')
  @ApiParam({ name: 'campaignId', required: true, description: 'ID of the campaign' })
  @ApiResponse({ status: 200, description: 'List of candidates with votes.' })
  async getCandidatesWithVotes(@Param('campaignId') campaignId: string) {
    return this.voteService.getCandidatesWithVotes(campaignId);
  }

  @Get('/campaign/:campaignId/total-users')
  @ApiParam({ name: 'campaignId', required: true, description: 'ID of the campaign' })
  @ApiResponse({ status: 200, description: 'Total number of users in the campaign.' })
  async getTotalUsersInCampaign(@Param('campaignId') campaignId: string) {
    return this.voteService.getTotalUsersInCampaign(campaignId);
  }

  @Get('/blankVote/:campaignId/total-black-votes')
  @ApiParam({ name: 'campaignId', required: true, description: 'ID of the campaign' })
  @ApiResponse({ status: 200, description: 'Total number of blank votes.' })
  async getBlankVotes(@Param('campaignId') campaignId: string) {
    return this.voteService.getBlankVotes(campaignId);
  }
}