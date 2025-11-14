
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Vehicle } from './entities/vehicle.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get('public')
  @ApiOperation({ summary: 'Obtenir la liste de tous les véhicules (public)' })
  @ApiResponse({ status: 200, description: 'Liste des véhicules récupérée avec succès.', type: [Vehicle] })
  findAllPublic() {
    return this.vehiclesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Créer un nouveau véhicule (Admin)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Données du véhicule et fichier image. Les champs du DTO doivent être envoyés comme des champs de formulaire.',
    type: CreateVehicleDto,
  })
  @ApiResponse({ status: 201, description: 'Véhicule créé avec succès.', type: Vehicle })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/vehicles',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  // FIX: Changed file type from Express.Multer.File to any to resolve namespace error.
  create(@Body() createVehicleDto: CreateVehicleDto, @UploadedFile() file: any) {
    if (file) {
      createVehicleDto.imageUrl = `/uploads/vehicles/${file.filename}`;
    }
    return this.vehiclesService.create(createVehicleDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Obtenir la liste de tous les véhicules (Admin)' })
  @ApiResponse({ status: 200, description: 'Liste des véhicules récupérée avec succès.', type: [Vehicle] })
  findAll() {
    return this.vehiclesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Obtenir les détails d\'un véhicule par son ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID du véhicule', type: Number })
  @ApiResponse({ status: 200, description: 'Détails du véhicule récupérés.', type: Vehicle })
  @ApiResponse({ status: 404, description: 'Véhicule non trouvé.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un véhicule par son ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID du véhicule à mettre à jour', type: Number })
  @ApiResponse({ status: 200, description: 'Véhicule mis à jour avec succès.', type: Vehicle })
  @ApiResponse({ status: 404, description: 'Véhicule non trouvé.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un véhicule par son ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID du véhicule à supprimer', type: Number })
  @ApiResponse({ status: 200, description: 'Véhicule supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Véhicule non trouvé.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.remove(id);
  }
}
