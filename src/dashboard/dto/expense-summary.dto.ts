import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from 'src/expenses/entities/expense.entity';

export class ExpenseSummaryDto {
  @ApiProperty({ enum: ExpenseCategory, example: ExpenseCategory.Entretien })
  category: ExpenseCategory;

  @ApiProperty({ example: 3200, description: "Montant total pour cette catégorie" })
  total: number;
}
