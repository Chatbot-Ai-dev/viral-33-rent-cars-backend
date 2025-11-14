import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { ExpenseCategory, Expense } from 'src/expenses/entities/expense.entity';
import { ReservationStatus, Reservation } from 'src/reservations/entities/reservation.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { FuelType, TransmissionType, Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Client) private readonly clientRepository: Repository<Client>,
    @InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Expense) private readonly expenseRepository: Repository<Expense>,
    private readonly usersService: UsersService,
  ) {}

  async seed() {
    const userCount = await this.userRepository.count();
    if (userCount > 0) {
      return; // Database is already seeded
    }

    // 1. Create Admin User
    await this.usersService.create({
      name: 'Admin',
      email: 'admin@viral33.ma',
      password: 'password',
    });

    // 2. Create Vehicles
    const vehiclesData = [
      { id: 1, brand: 'Dacia', model: 'Duster', year: 2023, pricePerDay: 350, fuel: FuelType.Diesel, transmission: TransmissionType.Manuelle, imageUrl: '/uploads/vehicles/duster.png', available: true },
      { id: 2, brand: 'Renault', model: 'Clio 5', year: 2022, pricePerDay: 300, fuel: FuelType.Essence, transmission: TransmissionType.Manuelle, imageUrl: '/uploads/vehicles/clio.png', available: true },
      { id: 3, brand: 'Peugeot', model: '208', year: 2023, pricePerDay: 320, fuel: FuelType.Essence, transmission: TransmissionType.Automatique, imageUrl: '/uploads/vehicles/208.png', available: false },
      { id: 4, brand: 'Hyundai', model: 'i10', year: 2022, pricePerDay: 250, fuel: FuelType.Essence, transmission: TransmissionType.Manuelle, imageUrl: '/uploads/vehicles/i10.png', available: true },
      { id: 5, brand: 'Kia', model: 'Picanto', year: 2023, pricePerDay: 260, fuel: FuelType.Essence, transmission: TransmissionType.Automatique, imageUrl: '/uploads/vehicles/picanto.png', available: true },
      { id: 6, brand: 'Toyota', model: 'Yaris', year: 2023, pricePerDay: 400, fuel: FuelType.Hybride, transmission: TransmissionType.Automatique, imageUrl: '/uploads/vehicles/yaris.png', available: true },
      { id: 7, brand: 'Volkswagen', model: 'Golf 8', year: 2022, pricePerDay: 500, fuel: FuelType.Diesel, transmission: TransmissionType.Automatique, imageUrl: '/uploads/vehicles/golf.png', available: false },
      { id: 8, brand: 'Mercedes', model: 'Classe A', year: 2023, pricePerDay: 700, fuel: FuelType.Diesel, transmission: TransmissionType.Automatique, imageUrl: '/uploads/vehicles/classea.png', available: true },
    ];
    const createdVehicles = await this.vehicleRepository.save(vehiclesData);

    // 3. Create Clients
    const clientsData = [
      { id: 1, name: 'Ahmed Alami', email: 'ahmed.alami@example.com', phone: '+212611223344' },
      { id: 2, name: 'Fatima Zahra', email: 'fatima.zahra@example.com', phone: '+212655667788' },
      { id: 3, name: 'Youssef Benali', email: 'youssef.benali@example.com', phone: '+212699887766' },
      { id: 4, name: 'Salma El Fassi', email: 'salma.elfassi@example.com', phone: '+212612345678' },
    ];
    const createdClients = await this.clientRepository.save(clientsData);

    // 4. Create Reservations
    const reservationsData = [
      { client: createdClients[0], vehicle: createdVehicles[2], startDate: '2024-07-20', endDate: '2024-07-25', status: ReservationStatus.Terminee },
      { client: createdClients[1], vehicle: createdVehicles[6], startDate: '2024-08-01', endDate: '2024-08-05', status: ReservationStatus.EnCours },
      { client: createdClients[2], vehicle: createdVehicles[0], startDate: '2024-08-10', endDate: '2024-08-15', status: ReservationStatus.Annulee },
      { client: createdClients[0], vehicle: createdVehicles[4], startDate: '2024-08-12', endDate: '2024-08-18', status: ReservationStatus.EnCours },
    ];
    await this.reservationRepository.save(reservationsData);

    // 5. Create Expenses
     const expensesData = [
      { date: '2024-07-15', description: 'Vidange Duster', amount: 800, category: ExpenseCategory.Entretien },
      { date: '2024-07-18', description: 'Assurance annuelle', amount: 4500, category: ExpenseCategory.Assurance },
      { date: '2024-07-22', description: 'Plein carburant Clio', amount: 550, category: ExpenseCategory.Carburant },
      { date: '2024-08-02', description: 'Changement pneus Golf', amount: 2400, category: ExpenseCategory.Entretien },
      { date: '2024-08-05', description: 'Nettoyage intérieur Picanto', amount: 150, category: ExpenseCategory.Autre },
    ];
    await this.expenseRepository.save(expensesData);
    
    console.log('Database seeded successfully!');
  }
}