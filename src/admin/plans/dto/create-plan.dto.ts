import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanDto {
  @ApiProperty({
    example: 'Europe Data 10GB',
    description: 'Name of the plan (e.g., "Europe Data 10GB")',
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
    example: 5.0,
    description: 'Provider price (admin only)',
  })
  @IsNumber()
  providerPrice: number;

  @ApiProperty({
    example: 15.99,
    description: 'Retail price (admin, maybe agency)',
  })
  @IsNumber()
  esimflyPrice: number;

  @ApiProperty({
    example: 10.99,
    description: 'Calculated profit (admin only)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  earnings?: number;

  @ApiProperty({
    example: '665f1b2c3a4d5e6f7a8b9c0d',
    description: 'Reference to the parent collection (collectionId)',
  })
  @IsString()
  collectionId: string;

  @ApiProperty({
    example: 'Europe',
    description: 'Country or region',
  })
  @IsString()
  country: string;

  @ApiProperty({
    example: true,
    description: 'Whether the plan is available',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @ApiProperty({
    example: 100,
    description: 'Number of available eSIMs',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  availableCount?: number;
}
