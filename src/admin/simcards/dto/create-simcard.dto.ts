import {
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsBoolean,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSimCardDto {
  @ApiProperty({
    example: '8986001234567890123',
    description: 'ICCID of the SIM card',
  })
  @IsNotEmpty({ message: 'ICCID is required' })
  iccid: string;

  @ApiProperty({
    example: '650e6f2f8b5b4b001c5f1234',
    description: 'ID of the user who owns this SIM card',
    required: false,
  })
  @IsOptional()
  @IsMongoId({ message: 'User ID must be a valid Mongo ID' })
  userId?: string;

  @ApiProperty({
    example: 'This is a comment',
    description: 'Optional comment for the SIM card',
    required: false,
  })
  @IsOptional()
  comment?: string;

  @ApiProperty({
    example: '650e6f2f8b5b4b001c5f1234',
    description: 'Optional provider ID',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  providerId?: string;

  @ApiProperty({
    example: '650e6f2f8b5b4b001c5f1234',
    description: 'Optional order ID',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  orderId?: string;

  @ApiProperty({
    example: false,
    description: 'Whether the SIM card is reserved',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  reserved?: boolean;
}
