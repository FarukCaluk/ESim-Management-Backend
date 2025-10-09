import { IsString, IsNumber } from 'class-validator';

export class CreatePackageDto {
  @IsString()
  name: string;

  @IsNumber()
  volume: number;

  @IsNumber()
  days: number;

  @IsNumber()
  providerPrice: number;
}
