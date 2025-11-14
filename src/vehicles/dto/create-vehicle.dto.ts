
import { IsString, IsNotEmpty, IsNumber, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { FuelType, TransmissionType } from '../entities/vehicle.entity';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Renault', description: 'Marque du véhicule' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 'Clio 5', description: 'Modèle du véhicule' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 2023, description: 'Année de fabrication' })
  @Type(() => Number)
  @IsNumber()
  year: number;

  @ApiProperty({ example: 300, description: 'Prix de location par jour en MAD' })
  @Type(() => Number)
  @IsNumber()
  pricePerDay: number;

  @ApiProperty({ enum: FuelType, example: FuelType.Essence, description: 'Type de carburant' })
  @IsEnum(FuelType)
  fuel: FuelType;

  @ApiProperty({ enum: TransmissionType, example: TransmissionType.Manuelle, description: 'Type de transmission' })
  @IsEnum(TransmissionType)
  transmission: TransmissionType;

  @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'Fichier image du véhicule. DOIT être envoyé via multipart/form-data.' })
  @IsOptional()
  image?: any;

  @ApiPropertyOptional({ readOnly: true, description: "URL de l'image, générée automatiquement après upload." })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ example: true, description: 'Disponibilité du véhicule', default: true })
  @IsOptional()
  @IsBoolean()
  available?: boolean;
}
