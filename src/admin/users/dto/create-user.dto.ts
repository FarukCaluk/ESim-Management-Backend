import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Faruk', description: 'User first name' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    example: 'faruk@example.com',
    description: 'User email address',
  })
  @IsEmail({}, { message: 'A valid email address is required' })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'User password, minimum 6 characters',
    writeOnly: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
