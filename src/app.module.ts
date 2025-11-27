import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ClientsModule } from './clients/clients.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ExpensesModule } from './expenses/expenses.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ContractsModule } from './contracts/contracts.module';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { Client } from './clients/entities/client.entity';
import { User } from './users/entities/user.entity';
import { Reservation } from './reservations/entities/reservation.entity';
import { Expense } from './expenses/entities/expense.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// FIX: Declare process to resolve 'cwd' property does not exist error on process type.
declare const process: any;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // MODIFICATION ICI : On ajoute des logs pour déboguer et on convertit le port
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('DB_HOST');
        const port = configService.get<string>('DB_PORT');
        const username = configService.get<string>('DB_USERNAME');
        const password = configService.get<string>('DB_PASSWORD');
        const database = configService.get<string>('DB_DATABASE');

        // Ces logs apparaîtront dans tes "Deploy Logs" sur Railway
        console.log('--- DEBUG DATABASE CONNECTION ---');
        console.log(`DB_HOST: ${host}`);
        console.log(`DB_PORT: ${port}`);
        console.log(`DB_USERNAME: ${username}`);
        console.log(`DB_DATABASE: ${database}`);
        console.log('---------------------------------');

        return {
          type: 'mysql',
          host: host,
          port: parseInt(port), // On force la conversion en nombre
          username: username,
          password: password,
          database: database,
          entities: [User, Vehicle, Client, Reservation, Expense],
          synchronize: true, // Attention: Mettre à false en production une fois stable
          logging: false,
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    AuthModule,
    UsersModule,
    VehiclesModule,
    ClientsModule,
    ReservationsModule,
    ExpensesModule,
    DashboardModule,
    ContractsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }