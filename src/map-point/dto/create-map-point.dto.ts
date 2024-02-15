import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class createMapPointDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  latitude: string;

  @IsNotEmpty()
  @IsNumber()
  longitude: string;
}
