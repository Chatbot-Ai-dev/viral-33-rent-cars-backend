
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum FuelType {
  Essence = 'Essence',
  Diesel = 'Diesel',
  Hybride = 'Hybride',
  Electrique = 'Électrique',
}

export enum TransmissionType {
  Automatique = 'Automatique',
  Manuelle = 'Manuelle',
}

@Entity()
export class Vehicle {
  @ApiProperty({ example: 1, description: "ID unique du véhicule" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Renault', description: 'Marque du véhicule' })
  @Column()
  brand: string;

  @ApiProperty({ example: 'Clio 5', description: 'Modèle du véhicule' })
  @Column()
  model: string;

  @ApiProperty({ example: 2023, description: 'Année de fabrication' })
  @Column()
  year: number;

  @ApiProperty({ example: 300, description: 'Prix de location par jour en MAD' })
  @Column()
  pricePerDay: number;

  @ApiProperty({ enum: FuelType, example: FuelType.Essence, description: 'Type de carburant' })
  @Column({ type: 'simple-enum', enum: FuelType })
  fuel: FuelType;

  @ApiProperty({ enum: TransmissionType, example: TransmissionType.Manuelle, description: 'Type de transmission' })
  @Column({ type: 'simple-enum', enum: TransmissionType })
  transmission: TransmissionType;

  @ApiPropertyOptional({ example: '/uploads/vehicles/clio.png', description: "URL de l'image du véhicule" })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty({ example: true, description: 'Indique si le véhicule est disponible à la location' })
  @Column({ default: true })
  available: boolean;

  // FIX: Explicitly typed `reservation` to resolve circular dependency issue.
  @OneToMany(() => Reservation, (reservation: Reservation) => reservation.vehicle)
  reservations: Reservation[];
}
