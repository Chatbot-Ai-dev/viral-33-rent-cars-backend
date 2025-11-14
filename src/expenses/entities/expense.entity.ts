import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum ExpenseCategory {
    Entretien = 'Entretien',
    Assurance = 'Assurance',
    Carburant = 'Carburant',
    Autre = 'Autre',
}

@Entity()
export class Expense {
  @ApiProperty({ example: 1, description: 'ID unique de la dépense' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '2024-07-15', description: 'Date de la dépense' })
  @Column({ type: 'date' })
  date: string;

  @ApiProperty({ example: 'Vidange Duster', description: 'Description de la dépense' })
  @Column()
  description: string;

  @ApiProperty({ example: 800, description: 'Montant de la dépense en MAD' })
  @Column()
  amount: number;

  @ApiProperty({ enum: ExpenseCategory, example: ExpenseCategory.Entretien, description: 'Catégorie de la dépense' })
  @Column({ type: 'simple-enum', enum: ExpenseCategory })
  category: ExpenseCategory;
}
