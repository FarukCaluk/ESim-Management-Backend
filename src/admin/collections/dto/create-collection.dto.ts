import { IsString, IsOptional, IsDateString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCollectionDto {
  @ApiProperty({
    example: 'Europe Summer Promo',
    description:
      'Name of the collection (e.g., "Europe", "Asia", "Summer Promo")',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Europe',
    description: 'Country or region this collection applies to',
  })
  @IsString()
  country: string;

  @ApiProperty({
    example: '2025-12-31T00:00:00.000Z',
    description: 'When the collection or its plans expire',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  expirationDate?: string;

  @ApiProperty({
    example: 'admin',
    description: 'Admin or agency who created it',
  })
  @IsString()
  createdBy: string;

  @ApiProperty({
    example: 'agency1',
    description: 'Agency this collection is assigned to (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  assignedAgency?: string;

  @ApiProperty({
    example: ['planId1', 'planId2'],
    description: 'Array of plan IDs or embedded plan objects',
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  plans?: string[];
}
