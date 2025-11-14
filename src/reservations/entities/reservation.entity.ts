import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/clients/entities/client.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';

export enum ReservationStatus {
  EnCours = 'En cours',
  Terminee = 'Terminée',
  Annulee = 'Annulée',
}

@Entity()
export class Reservation {
  @ApiProperty({ example: 1, description: 'ID unique de la réservation' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Client, description: 'Client associé à la réservation' })
  // FIX: Explicitly typed `client` to resolve circular dependency issue.
  // Eager loading removed to prevent circular dependency issues during serialization.
  @ManyToOne(() => Client, (client: Client) => client.reservations)
  client: Client;

  @ApiProperty({ type: () => Vehicle, description: 'Véhicule associé à la réservation' })
  // FIX: Explicitly typed `vehicle` to resolve circular dependency issue.
  // Eager loading removed to prevent circular dependency issues during serialization.
  @ManyToOne(() => Vehicle, (vehicle: Vehicle) => vehicle.reservations)
  vehicle: Vehicle;

  @ApiProperty({ example: '2024-08-01', description: 'Date de début de la location' })
  @Column({ type: 'date' })
  startDate: string;

  @ApiProperty({ example: '2024-08-05', description: 'Date de fin de la location' })
  @Column({ type: 'date' })
  endDate: string;

  @ApiProperty({ enum: ReservationStatus, example: ReservationStatus.EnCours, description: 'Statut actuel de la réservation' })
  @Column({
    type: 'simple-enum',
    enum: ReservationStatus,
    default: ReservationStatus.EnCours,
  })
  status: ReservationStatus;

  @ApiProperty({ description: 'Date de création de la réservation' })
  @CreateDateColumn()
  createdAt: Date;
}
