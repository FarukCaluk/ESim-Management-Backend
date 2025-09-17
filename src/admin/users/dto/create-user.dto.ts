import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Faruk', description: 'Ime korisnika' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'faruk@example.com', description: 'Email korisnika' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Lozinka korisnika, minimalno 6 karaktera' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
