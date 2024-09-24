import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CandidateService } from "./candidate.service";
import { CandidateController } from "./candidate.controller";
import { Candidate } from "../../entities/candidate.entity";
import { User } from "../../entities/user.entity";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { Role } from "src/entities/roles.entity";
import { Campaign } from "src/entities/campaign.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, User,Role, Campaign]),CloudinaryModule],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
