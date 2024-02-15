import {
  Body,
  Controller,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { GameService } from './game.service';
import { GetToken, TokenCookieType } from '../auth/get-token.decorator';
import { createGameDto } from './dto/createGame.dto';
import { updateGameDto } from './dto/updateGame.dto';

@Controller('games')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post('/')
  async createGame(
    @GetToken() token: TokenCookieType,
    @Body() gameDto: createGameDto,
  ) {
    return this.gameService.createGame(token, gameDto);
  }

  @Get('/:id')
  async getGame(@Param('id') id: string, @GetToken() token: TokenCookieType) {
    return this.gameService.getGame(token, id);
  }

  @Put('/')
  async updateGame(
    @GetToken() token: TokenCookieType,
    @Body() gameDto: updateGameDto,
  ) {
    return this.gameService.updateGame(token, gameDto);
  }

  @Post('/upload-image')
  @UseInterceptors(FileInterceptor('game'))
  async uploadFile(
    @GetToken() token: TokenCookieType,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.gameService.processImage(token, file);
  }
}
