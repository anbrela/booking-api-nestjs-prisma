import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

import { GameModule } from './game/game.module';
import { MapPointModule } from './map-point/map-point.module';
import { MulterModule } from '@nestjs/platform-express';

import { QuestionModule } from './question/question.module';
import multer from 'multer';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    GameModule,
    QuestionModule,
    MapPointModule,
    MulterModule.register({
      dest: './uploads',
      storage: multer.memoryStorage(),
    }),
  ],
})
export class AppModule {}
