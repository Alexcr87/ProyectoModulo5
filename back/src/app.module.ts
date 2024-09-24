import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CandidateModule } from './modules/candidate/candidate.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { RoleModule } from './modules/role/role.module';
import { RoleSeedService } from './seeder/seed.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CampaignModule } from './modules/campaign/campaign.module';
import { SeedModule } from './seeder/seed.module';
import { UserSeedService } from './seeder/user.seed.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load:[typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService: ConfigService)=> configService.get('typeorm')
    }),
  AuthModule,
  UserModule,
  CandidateModule,
  CloudinaryModule,
  RoleModule,
  CampaignModule,
  SeedModule,
  JwtModule.register({
    global:true,
    signOptions:{expiresIn:"1h"},
    secret:process.env.JWT_SECRET
  })
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly roleSeedService: RoleSeedService,
    private readonly userSeedService: UserSeedService,
  ) {}

  async onModuleInit() {
    // Ejecuta el seed de roles y usuarios cuando la app se inicie
    await this.roleSeedService.seed();
    await this.userSeedService.seed();
  }
}