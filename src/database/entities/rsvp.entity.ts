import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Guest } from './guest.entity';
import { Invitation } from './invitation.entity';

export enum RsvpStatus {
  ATTENDING = 'attending',
  NOT_ATTENDING = 'not_attending',
  MAYBE = 'maybe',
}

@Entity('rsvps')
export class Rsvp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  guestId: string;

  @ManyToOne(() => Guest)
  @JoinColumn({ name: 'guestId' })
  guest: Guest;

  @Column({ type: 'uuid' })
  invitationId: string;

  @ManyToOne(() => Invitation)
  @JoinColumn({ name: 'invitationId' })
  invitation: Invitation;

  @Column({
    type: 'enum',
    enum: RsvpStatus,
  })
  status: RsvpStatus;

  @Column({ type: 'integer', nullable: true })
  numberOfGuests?: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'jsonb', nullable: true })
  preferences?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}