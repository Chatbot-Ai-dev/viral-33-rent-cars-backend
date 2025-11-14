import { Injectable, NotFoundException } from '@nestjs/common';
import { ReservationsService } from 'src/reservations/reservations.service';
import * as PDFDocument from 'pdfkit';
// FIX: Import Buffer to resolve 'Buffer' not found errors.
import { Buffer } from 'buffer';

@Injectable()
export class ContractsService {
  constructor(private readonly reservationsService: ReservationsService) {}

  async generateContractPdf(reservationId: number): Promise<Buffer> {
    const reservation = await this.reservationsService.findOne(reservationId);
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${reservationId} not found`);
    }

    const { client, vehicle, startDate, endDate } = reservation;
    const pricePerDay = vehicle.pricePerDay;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) || 1;
    const totalPrice = durationDays * pricePerDay;


    const pdfBuffer: Buffer = await new Promise(resolve => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      let buffers = [];
      
      // Header
      doc.fontSize(20).font('Helvetica-Bold').text('Contrat de Location de Véhicule', { align: 'center' });
      doc.moveDown();
      
      // Agency Info
      doc.fontSize(12).font('Helvetica-Bold').text('Agence: VIRAL 33 Rent Cars');
      doc.font('Helvetica').text('Adresse: 123 Avenue Hassan II, Fès, Maroc');
      doc.text('Téléphone: +212 6 33 33 33 33');
      doc.moveDown(2);

      // Contract Details
      doc.fontSize(14).font('Helvetica-Bold').text('Détails du Contrat');
      doc.lineCap('butt').moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();
      doc.fontSize(11).font('Helvetica')
         .text(`Numéro de réservation: ${reservation.id}`)
         .text(`Date de début: ${new Date(startDate).toLocaleDateString('fr-FR')}`)
         .text(`Date de fin: ${new Date(endDate).toLocaleDateString('fr-FR')}`)
         .text(`Durée: ${durationDays} jour(s)`);
      doc.moveDown(2);

      // Client Info
      doc.fontSize(14).font('Helvetica-Bold').text('Informations du Locataire (Client)');
      doc.lineCap('butt').moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();
      doc.fontSize(11).font('Helvetica')
        .text(`Nom complet: ${client.name}`)
        .text(`Email: ${client.email}`)
        .text(`Téléphone: ${client.phone}`);
      doc.moveDown(2);

      // Vehicle Info
      doc.fontSize(14).font('Helvetica-Bold').text('Informations du Véhicule');
      doc.lineCap('butt').moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();
      doc.fontSize(11).font('Helvetica')
        .text(`Marque & Modèle: ${vehicle.brand} ${vehicle.model}`)
        .text(`Année: ${vehicle.year}`)
        .text(`Carburant: ${vehicle.fuel}`)
        .text(`Boîte de vitesses: ${vehicle.transmission}`);
      doc.moveDown(2);
      
      // Pricing
      doc.fontSize(14).font('Helvetica-Bold').text('Tarification');
      doc.lineCap('butt').moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();
      doc.fontSize(12).font('Helvetica')
        .text(`Prix par jour: ${pricePerDay.toFixed(2)} MAD`)
        .text(`Montant total: ${totalPrice.toFixed(2)} MAD`);
      doc.moveDown(3);

      // Signatures
      doc.fontSize(12).text('Signature du Locataire:', { continued: true, align: 'left' });
      doc.text('Signature de l\'Agence:', { align: 'right' });
      doc.moveDown(2)
      doc.text('_________________________', { continued: true, align: 'left' });
      doc.text('_________________________', { align: 'right' });


      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const data = Buffer.concat(buffers);
        resolve(data);
      });
      doc.end();
    });

    return pdfBuffer;
  }
}