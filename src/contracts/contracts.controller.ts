import { Controller, Get, Param, ParseIntPipe, Res, UseGuards } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Contracts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}
  
  @Get('reservation/:id')
  @ApiOperation({ summary: "Générer et télécharger un contrat de location en PDF (Admin)" })
  @ApiParam({ name: 'id', description: 'ID de la réservation pour laquelle générer le contrat', type: Number })
  @ApiResponse({ 
    status: 200, 
    description: 'Contrat PDF généré avec succès.',
    content: { 'application/pdf': { schema: { type: 'string', format: 'binary' } } }
  })
  @ApiResponse({ status: 404, description: 'Réservation non trouvée.' })
  async generateContract(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
      const pdfBuffer = await this.contractsService.generateContractPdf(id);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=contrat-reservation-${id}.pdf`,
        'Content-Length': pdfBuffer.length,
      });

      res.end(pdfBuffer);
  }
}
