import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCampaignDescriptionAndProposalToCandidate1726684972975
  implements MigrationInterface
{
  name = 'AddCampaignDescriptionAndProposalToCandidate1726684972975';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "candidate" RENAME COLUMN "proposal" TO "proposals"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "candidate" RENAME COLUMN "proposals" TO "proposal"`,
    );
  }
}
