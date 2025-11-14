import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private vehiclesService: VehiclesService,
    private clientsService: ClientsService,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    const { vehicleId, clientId, clientName, clientEmail, clientPhone, ...restDto } = createReservationDto;

    let finalClientId = clientId;

    // Handle case where client is created on the fly from the public form
    if (!clientId && clientName && clientEmail && clientPhone) {
        try {
            const newClient = await this.clientsService.create({ name: clientName, email: clientEmail, phone: clientPhone });
            finalClientId = newClient.id;
        } catch (error) {
            throw new BadRequestException('Could not create new client. Email might already exist.');
        }
    }

    if (!finalClientId) {
      throw new BadRequestException('Client information is required.');
    }

    const vehicle = await this.vehiclesService.findOne(vehicleId);
    const client = await this.clientsService.findOne(finalClientId);

    if (!vehicle.available) {
        throw new BadRequestException(`Vehicle ${vehicle.brand} ${vehicle.model} is not available.`);
    }

    const reservation = this.reservationRepository.create({
      ...restDto,
      vehicle,
      client,
    });
    
    // Set vehicle as unavailable
    await this.vehiclesService.update(vehicleId, { available: false });

    return this.reservationRepository.save(reservation);
  }

  findAll() {
    return this.reservationRepository.find({ relations: ['client', 'vehicle'] });
  }

  async findOne(id: number) {
    const reservation = await this.reservationRepository.findOne({ where: {id}, relations: ['client', 'vehicle'] });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    // If status is changed to 'Terminée' or 'Annulée', make the car available again
    // FIX: Cast to `any` to resolve property 'status' does not exist error.
    if ((updateReservationDto as any).status && ['Terminée', 'Annulée'].includes((updateReservationDto as any).status)) {
        const reservation = await this.findOne(id);
        if (reservation.vehicle) {
            await this.vehiclesService.update(reservation.vehicle.id, { available: true });
        }
    }

    const reservation = await this.reservationRepository.preload({
      id,
      ...updateReservationDto,
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return this.reservationRepository.save(reservation);
  }

  async remove(id: number) {
    const reservation = await this.findOne(id);
    // Make car available again if reservation is deleted
    if(reservation.vehicle) {
        await this.vehiclesService.update(reservation.vehicle.id, { available: true });
    }
    return this.reservationRepository.remove(reservation);
  }
}