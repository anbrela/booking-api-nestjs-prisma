import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class updateGameDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @IsNotEmpty()
  images: string[];

  @IsNumber()
  duration: number;

  @IsString()
  @IsNotEmpty()
  startingPointId: string;

  @IsString()
  @IsNotEmpty()
  endingPointId: string;

  @IsOptional()
  pointsOfInterest?: string[];
}
