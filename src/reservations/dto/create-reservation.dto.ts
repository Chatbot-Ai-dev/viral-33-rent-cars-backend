import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsEnum, IsOptional, IsString, IsEmail } from 'class-validator';
import { ReservationStatus } from '../entities/reservation.entity';

export class CreateReservationDto {
  @ApiProperty({ example: 1, description: 'ID du véhicule à réserver' })
  @IsNumber()
  vehicleId: number;

  // For admin panel: select an existing client
  @ApiPropertyOptional({ example: 2, description: "ID d'un client existant (pour le panneau admin)" })
  @IsOptional()
  @IsNumber()
  clientId?: number;

  // For public form: create a new client
  @ApiPropertyOptional({ example: 'Nouveau Client', description: 'Nom du nouveau client (pour le formulaire public)' })
  @IsOptional()
  @IsString()
  clientName?: string;
  
  @ApiPropertyOptional({ example: 'nouveau@client.com', description: 'Email du nouveau client (pour le formulaire public)' })
  @IsOptional()
  @IsEmail()
  clientEmail?: string;

  @ApiPropertyOptional({ example: '+212612345678', description: 'Téléphone du nouveau client (pour le formulaire public)' })
  @IsOptional()
  @IsString()
  clientPhone?: string;

  @ApiProperty({ example: '2024-09-10', description: 'Date de début de la location' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ example: '2024-09-15', description: 'Date de fin de la location' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiPropertyOptional({ enum: ReservationStatus, description: 'Statut de la réservation', default: ReservationStatus.EnCours })
  @IsOptional()
  @IsEnum(ReservationStatus)
  status?: ReservationStatus;
}
