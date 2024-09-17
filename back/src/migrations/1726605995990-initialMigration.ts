import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1726605995990 implements MigrationInterface {
    name = 'InitialMigration1726605995990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(80) NOT NULL, "dni" integer NOT NULL, "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "address" text NOT NULL, "city" character varying(50) NOT NULL, "country" character varying(50) NOT NULL, "rol" character varying NOT NULL DEFAULT 'usuario', "suffrage" boolean NOT NULL DEFAULT false, "candidateId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_5c69b681c2b3f234bf6833507a" UNIQUE ("candidateId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "candidate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "count" integer NOT NULL, "postulation" character varying(20) NOT NULL, "imgUrl" character varying NOT NULL, "list" character varying NOT NULL, CONSTRAINT "PK_b0ddec158a9a60fbc785281581b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vote" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "candidateId" uuid, CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_5c69b681c2b3f234bf6833507a3" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_2d7b9fc93f085b1373f3fed397f" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_2d7b9fc93f085b1373f3fed397f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_5c69b681c2b3f234bf6833507a3"`);
        await queryRunner.query(`DROP TABLE "vote"`);
        await queryRunner.query(`DROP TABLE "candidate"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
