import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin@viral33.ma',
    description: "Email de l'utilisateur",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
    description: "Mot de passe de l'utilisateur",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
