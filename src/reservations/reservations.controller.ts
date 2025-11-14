import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Res } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Reservation } from './entities/reservation.entity';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // Public endpoint for creating a reservation from the website
  @Post('public')
  @ApiOperation({ summary: 'Créer une nouvelle réservation (Public)' })
  @ApiResponse({ status: 201, description: 'Réservation créée avec succès.', type: Reservation })
  @ApiResponse({ status: 400, description: 'Données invalides (ex: véhicule non disponible, client non valide).' })
  publicCreate(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle réservation (Admin)' })
  @ApiResponse({ status: 201, description: 'Réservation créée avec succès.', type: Reservation })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Obtenir la liste de toutes les réservations (Admin)' })
  @ApiResponse({ status: 200, description: 'Liste des réservations récupérée avec succès.', type: [Reservation] })
  findAll() {
    return this.reservationsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Obtenir les détails d\'une réservation par son ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID de la réservation', type: Number })
  @ApiResponse({ status: 200, description: 'Détails de la réservation récupérés.', type: Reservation })
  @ApiResponse({ status: 404, description: 'Réservation non trouvée.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.findOne(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id/contract')
  // FIX: Correctly typed `res` parameter and imported `Res` decorator.
  async getContract(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
      // Note: This endpoint is now handled by ContractsController
      // This is left as an example of what not to do.
      // The logic is moved to ContractsController to keep controllers clean.
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une réservation par son ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID de la réservation à mettre à jour', type: Number })
  @ApiResponse({ status: 200, description: 'Réservation mise à jour avec succès.', type: Reservation })
  @ApiResponse({ status: 404, description: 'Réservation non trouvée.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une réservation par son ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID de la réservation à supprimer', type: Number })
  @ApiResponse({ status: 200, description: 'Réservation supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Réservation non trouvée.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.remove(id);
  }
}
