import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from '../database/entities/invitation.entity';
import { Guest } from '../database/entities/guest.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
    @InjectRepository(Guest)
    private guestRepository: Repository<Guest>,
    private emailService: EmailService,
  ) {}

  async findAll(): Promise<Invitation[]> {
    return this.invitationRepository.find({ 
      relations: ['event', 'createdBy', 'template', 'guests'] 
    });
  }

  async findOne(id: string): Promise<Invitation> {
    const invitation = await this.invitationRepository.findOne({ 
      where: { id },
      relations: ['event', 'createdBy', 'template', 'guests'] 
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }
    return invitation;
  }

  async create(invitationData: Partial<Invitation>): Promise<Invitation> {
    const invitation = this.invitationRepository.create(invitationData);
    const savedInvitation = await this.invitationRepository.save(invitation);
    
    // Send invitation email
    const invAny = invitationData as any;
    if (invAny.email) {
      await this.emailService.sendInvitation(
        invAny.email,
        invAny.event?.name || 'Evento',
        savedInvitation,
      );
    }
    
    return savedInvitation;
  }

  async update(id: string, invitationData: Partial<Invitation>): Promise<Invitation> {
    const invitation = await this.findOne(id);
    Object.assign(invitation, invitationData);
    return this.invitationRepository.save(invitation);
  }

  async remove(id: string): Promise<void> {
    const invitation = await this.findOne(id);
    await this.invitationRepository.remove(invitation);
  }

  async addGuest(invitationId: string, guestData: Partial<Guest>): Promise<Guest> {
    const invitation = await this.findOne(invitationId);
    const guest = this.guestRepository.create({
      ...guestData,
      invitation,
    });
    return this.guestRepository.save(guest);
  }
}