import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { VoteDto } from "src/dto/vote.dto";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('votes')
@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  async votar(
    @Body() voteDto: VoteDto,  // Ahora recibimos el userId en el cuerpo
  ): Promise<string> {
    // Extrae userId del cuerpo de la solicitud
    const userId = voteDto.userId; 
    return this.voteService.votar(userId, voteDto.campaignId, voteDto.candidateId);
  }

  @Get('/candidates/:campaignId')
  @ApiParam({ name: 'campaignId', required: true, description: 'ID of the campaign' })
  @ApiResponse({ status: 200, description: 'List of candidates with votes.' })
  async getCandidatesWithVotes(@Param('campaignId') campaignId: string) {
    return this.voteService.getCandidatesWithVotes(campaignId);
  }

  @Get('/total-users/:campaignId')
  @ApiParam({ name: 'campaignId', required: true, description: 'ID of the campaign' })
  @ApiResponse({ status: 200, description: 'Total number of users in the campaign.' })
  async getTotalUsersInCampaign(@Param('campaignId') campaignId: string) {
    return this.voteService.getTotalUsersInCampaign(campaignId);
  }

  @Get('/total-black-votes/:campaignId')
  @ApiParam({ name: 'campaignId', required: true, description: 'ID of the campaign' })
  @ApiResponse({ status: 200, description: 'Total number of blank votes.' })
  async getBlankVotes(@Param('campaignId') campaignId: string) {
    return this.voteService.getBlankVotes(campaignId);
  }
}
