import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: "ID unique de l'utilisateur" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Admin Viral', description: "Nom complet de l'utilisateur" })
  @Column()
  name: string;

  @ApiProperty({
    example: 'admin@viral33.ma',
    description: "Adresse email unique de l'utilisateur",
  })
  @Column({ unique: true })
  email: string;

  @ApiHideProperty()
  @Column()
  password: string;

  @ApiProperty({ description: "Date de création de l'utilisateur" })
  @CreateDateColumn()
  createdAt: Date;
}
