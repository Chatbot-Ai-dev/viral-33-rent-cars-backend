import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Admin Viral', description: "Nom complet de l'utilisateur" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'admin@viral33.ma', description: "Adresse email unique de l'utilisateur" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: "Mot de passe (8 caractères minimum)" })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
