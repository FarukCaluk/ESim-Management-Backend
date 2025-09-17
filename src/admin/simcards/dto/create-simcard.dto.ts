import { IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSimCardDto {
  @ApiProperty({ example: '8986001234567890123', description: 'ICCID sim kartice' })
  @IsNotEmpty()
  iccid: string;

  @ApiProperty({ example: '650e6f2f8b5b4b001c5f1234', description: 'ID korisnika kojem pripada sim kartica', required: false })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @ApiProperty({ example: 'Ovo je komentar', description: 'Komentar za sim karticu', required: false })
  @IsOptional()
  comment?: string;
}
