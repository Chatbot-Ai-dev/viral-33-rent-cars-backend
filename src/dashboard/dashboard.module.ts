import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { ExpensesModule } from 'src/expenses/expenses.module';

@Module({
  imports: [ClientsModule, VehiclesModule, ReservationsModule, ExpensesModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}