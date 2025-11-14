import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from './entities/client.entity';

@ApiTags('Clients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau client (Admin)' })
  @ApiResponse({ status: 201, description: 'Client créé avec succès.', type: Client })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir la liste de tous les clients (Admin)' })
  @ApiResponse({ status: 200, description: 'Liste des clients récupérée avec succès.', type: [Client] })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir les détails d\'un client par son ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID du client', type: Number })
  @ApiResponse({ status: 200, description: 'Détails du client récupérés.', type: Client })
  @ApiResponse({ status: 404, description: 'Client non trouvé.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un client par son ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID du client à mettre à jour', type: Number })
  @ApiResponse({ status: 200, description: 'Client mis à jour avec succès.', type: Client })
  @ApiResponse({ status: 404, description: 'Client non trouvé.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un client par son ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID du client à supprimer', type: Number })
  @ApiResponse({ status: 200, description: 'Client supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Client non trouvé.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.remove(id);
  }
}
