import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rsvp, RsvpStatus } from '../database/entities/rsvp.entity';

@Injectable()
export class RsvpService {
  constructor(
    @InjectRepository(Rsvp)
    private rsvpRepository: Repository<Rsvp>,
  ) {}

  async findAll(): Promise<Rsvp[]> {
    return this.rsvpRepository.find({ 
      relations: ['guest', 'invitation'] 
    });
  }

  async findOne(id: string): Promise<Rsvp> {
    const rsvp = await this.rsvpRepository.findOne({ 
      where: { id },
      relations: ['guest', 'invitation'] 
    });
    if (!rsvp) {
      throw new NotFoundException('RSVP not found');
    }
    return rsvp;
  }

  async create(rsvpData: Partial<Rsvp>): Promise<Rsvp> {
    const rsvp = this.rsvpRepository.create(rsvpData);
    return this.rsvpRepository.save(rsvp);
  }

  async update(id: string, rsvpData: Partial<Rsvp>): Promise<Rsvp> {
    const rsvp = await this.findOne(id);
    Object.assign(rsvp, rsvpData);
    return this.rsvpRepository.save(rsvp);
  }

  async remove(id: string): Promise<void> {
    const rsvp = await this.findOne(id);
    await this.rsvpRepository.remove(rsvp);
  }

  async getRsvpByInvitation(invitationId: string): Promise<Rsvp[]> {
    return this.rsvpRepository.find({
      where: { invitationId },
      relations: ['guest'],
    });
  }

  async getRsvpStats(invitationId: string) {
    const rsvps = await this.getRsvpByInvitation(invitationId);
    
    const stats = {
      total: rsvps.length,
      attending: rsvps.filter(r => r.status === RsvpStatus.ATTENDING).length,
      notAttending: rsvps.filter(r => r.status === RsvpStatus.NOT_ATTENDING).length,
      maybe: rsvps.filter(r => r.status === RsvpStatus.MAYBE).length,
    };

    return stats;
  }
}