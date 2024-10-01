import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CandidateModule } from './modules/candidate/candidate.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { RoleModule } from './modules/role/role.module';
import { RoleSeedService } from './seeder/userSeeder/seed.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CampaignModule } from './modules/campaign/campaign.module';
import { PaymentModule } from './modules/payments/payment.module';
import { AccountSeedModule } from './seeder/accountSeeder/seed.module';
import { MailModule } from './modules/mail/mail.module';
import { AccountSeeder } from './seeder/accountSeeder/seed.service';
import { SeedModule } from './seeder/userSeeder/seed.module';
import { UserSeedService } from './seeder/userSeeder/user.seed.service';
import { VoteModule } from './modules/vote/vote.module';
import { RedirectController } from './redirectController';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
      envFilePath: '.env.development',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    AuthModule,
    MailModule,
    PaymentModule,
    UserModule,
    CandidateModule,
    CloudinaryModule,
    RoleModule,
    CampaignModule,
    AccountSeedModule,
    SeedModule,
    VoteModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [RedirectController],
  providers: [],
  exports: [],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly roleSeedService: RoleSeedService,
    private readonly userSeedService: UserSeedService,
    private readonly accountSeedService: AccountSeeder,
  ) {}

  async onModuleInit() {
    // Ejecuta el seed de roles y usuarios cuando la app se inicie
    await this.roleSeedService.seed();
    await this.userSeedService.seed();
    await this.accountSeedService.seed();
  }
}
