import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CandidateService } from "./candidate.service";
import { CandidateController } from "./candidate.controller";
import { Candidate } from "../../entities/candidate.entity";
import { User } from "../../entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, User])],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
