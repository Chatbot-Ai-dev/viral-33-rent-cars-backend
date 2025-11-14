import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Expense } from './entities/expense.entity';

@ApiTags('Expenses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle dépense (Admin)' })
  @ApiResponse({ status: 201, description: 'Dépense créée avec succès.', type: Expense })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir la liste de toutes les dépenses (Admin)' })
  @ApiResponse({ status: 200, description: 'Liste des dépenses récupérée avec succès.', type: [Expense] })
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir les détails d\'une dépense par son ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID de la dépense', type: Number })
  @ApiResponse({ status: 200, description: 'Détails de la dépense récupérés.', type: Expense })
  @ApiResponse({ status: 404, description: 'Dépense non trouvée.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une dépense par son ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID de la dépense à mettre à jour', type: Number })
  @ApiResponse({ status: 200, description: 'Dépense mise à jour avec succès.', type: Expense })
  @ApiResponse({ status: 404, description: 'Dépense non trouvée.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une dépense par son ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID de la dépense à supprimer', type: Number })
  @ApiResponse({ status: 200, description: 'Dépense supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Dépense non trouvée.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.remove(id);
  }
}
