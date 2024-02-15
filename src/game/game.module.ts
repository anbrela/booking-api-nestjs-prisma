import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameRepository } from './game.repository';
import { MapPointModule } from '../map-point/map-point.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [GameController],
  imports: [AuthModule, MapPointModule],
  providers: [GameService, GameRepository],
})
export class GameModule {}
