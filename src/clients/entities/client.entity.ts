import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Client {
  @ApiProperty({ example: 1, description: 'ID unique du client' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Ahmed Alami', description: 'Nom complet du client' })
  @Column()
  name: string;

  @ApiProperty({ example: 'ahmed.alami@example.com', description: 'Adresse email du client' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '+212611223344', description: 'Numéro de téléphone du client' })
  @Column()
  phone: string;

  // FIX: Explicitly typed `reservation` to resolve circular dependency issue.
  @OneToMany(() => Reservation, (reservation: Reservation) => reservation.client)
  reservations: Reservation[];
}
