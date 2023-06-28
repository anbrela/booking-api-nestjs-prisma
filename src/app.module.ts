import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { AvailabilityModule } from './avaliability/availability.module';

@Module({
  imports: [PrismaModule, AuthModule, CompanyModule, AvailabilityModule],
})
export class AppModule {}
