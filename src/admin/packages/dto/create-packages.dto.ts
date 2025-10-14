import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePackageDto {
  @ApiProperty({
    example: 'Europe Data 10GB',
    description: 'Name of the package',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 10,
    description: 'Data volume in GB',
  })
  @IsNumber()
  volume: number;

  @ApiProperty({
    example: 30,
    description: 'Validity period in days',
  })
  @IsNumber()
  days: number;

  @ApiProperty({
    example: 15.99,
    description: 'Provider price for the package',
  })
  @IsNumber()
  providerPrice: number;
}
