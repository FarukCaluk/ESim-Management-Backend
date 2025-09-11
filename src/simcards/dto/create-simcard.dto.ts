import { IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class CreateSimCardDto {
  @IsNotEmpty()
  iccid: string;

  @IsOptional()
  @IsMongoId()
  userId?: string;

  @IsOptional()
  comment?: string;
}
