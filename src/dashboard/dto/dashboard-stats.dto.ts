import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { ExpenseSummaryDto } from './expense-summary.dto';

export class DashboardStatsDto {
  @ApiProperty({ example: 15, description: "Nombre total de clients" })
  totalClients: number;
  
  @ApiProperty({ example: 8, description: "Nombre total de véhicules dans la flotte" })
  totalVehicles: number;

  @ApiProperty({ example: 6, description: "Nombre de véhicules actuellement disponibles" })
  availableVehicles: number;

  @ApiProperty({ example: 2, description: "Nombre de réservations actuellement en cours" })
  ongoingReservations: number;

  @ApiProperty({ example: 1250.50, description: "Total des dépenses pour le mois en cours" })
  monthlyExpenses: number;

  @ApiProperty({ type: () => [Reservation], description: "Les 5 réservations les plus récentes" })
  recentReservations: Reservation[];

  @ApiProperty({ type: () => [ExpenseSummaryDto], description: "Résumé des dépenses totales par catégorie" })
  expenseSummary: ExpenseSummaryDto[];
}
