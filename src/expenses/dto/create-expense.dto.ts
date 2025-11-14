import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ExpenseCategory } from "../entities/expense.entity";

export class CreateExpenseDto {
    @ApiProperty({ example: '2024-08-10', description: 'Date de la dépense' })
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @ApiProperty({ example: 'Plein de carburant pour la Clio', description: 'Description de la dépense' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 550.00, description: 'Montant de la dépense en MAD' })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ enum: ExpenseCategory, example: ExpenseCategory.Carburant, description: 'Catégorie de la dépense' })
    @IsEnum(ExpenseCategory)
    @IsNotEmpty()
    category: ExpenseCategory;
}
