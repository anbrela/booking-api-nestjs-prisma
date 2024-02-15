import { IsNotEmpty, IsString } from 'class-validator';

export class createGameDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  city: string;
}
