import { Injectable } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { ExpenseCategory } from 'src/expenses/entities/expense.entity';
import { ExpensesService } from 'src/expenses/expenses.service';
import { ReservationStatus } from 'src/reservations/entities/reservation.entity';
import { ReservationsService } from 'src/reservations/reservations.service';
import { VehiclesService } from 'src/vehicles/vehicles.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly vehiclesService: VehiclesService,
    private readonly reservationsService: ReservationsService,
    private readonly expensesService: ExpensesService,
  ) {}

  async getStats() {
    const clients = await this.clientsService.findAll();
    const vehicles = await this.vehiclesService.findAll();
    const reservations = await this.reservationsService.findAll();
    const expenses = await this.expensesService.findAll();

    const totalClients = clients.length;
    const totalVehicles = vehicles.length;
    const availableVehicles = vehicles.filter((v) => v.available).length;
    const ongoingReservations = reservations.filter(
      (r) => r.status === ReservationStatus.EnCours,
    ).length;
    
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7); // YYYY-MM
    const monthlyExpenses = expenses
        .filter(e => e.date.startsWith(currentMonth))
        .reduce((sum, e) => sum + e.amount, 0);

    const expenseSummary = Object.values(ExpenseCategory).map(category => ({
      category,
      total: expenses
        .filter(e => e.category === category)
        .reduce((sum, e) => sum + e.amount, 0)
    }));

    return {
      totalClients,
      totalVehicles,
      availableVehicles,
      ongoingReservations,
      monthlyExpenses,
      recentReservations: reservations
        .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
      expenseSummary,
    };
  }
}