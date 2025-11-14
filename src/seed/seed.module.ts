import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Expense } from 'src/expenses/entities/expense.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Vehicle, Client, Reservation, Expense]),
    UsersModule,
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}