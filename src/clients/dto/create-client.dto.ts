import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateClientDto {
    @ApiProperty({ example: 'Fatima Zahra', description: 'Nom complet du client' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'fatima.zahra@example.com', description: 'Adresse email du client' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty({ example: '+212655667788', description: 'Numéro de téléphone du client' })
    // Using a generic IsString for phone, but IsPhoneNumber('MA') could be used with a specific library
    @IsString() 
    @IsNotEmpty()
    phone: string;
}