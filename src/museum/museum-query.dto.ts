/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class MuseumQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsNumberString()
  foundedBefore?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
