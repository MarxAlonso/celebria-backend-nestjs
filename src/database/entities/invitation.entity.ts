import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';
import { Guest } from './guest.entity';

export enum InvitationStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  DELIVERED = 'delivered',
  VIEWED = 'viewed',
  EXPIRED = 'expired',
}

export enum InvitationType {
  DIGITAL = 'digital',
  PRINTED = 'printed',
  HYBRID = 'hybrid',
}

@Entity('invitations')
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ type: 'enum', enum: InvitationType, default: InvitationType.DIGITAL })
  type: InvitationType;

  @Column({ type: 'enum', enum: InvitationStatus, default: InvitationStatus.DRAFT })
  status: InvitationStatus;

  @Column({ type: 'uuid' })
  eventId: string;

  @ManyToOne(() => Event, (event) => event.invitations)
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @Column({ type: 'uuid' })
  createdById: string;

  @ManyToOne(() => User, (user) => user.invitations)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column({ type: 'uuid', nullable: true })
  templateId?: string;

  @ManyToOne(() => Template)
  @JoinColumn({ name: 'templateId' })
  template?: Template;

  @Column({ type: 'jsonb', nullable: true })
  customDesign?: Record<string, any>;

  @Column({ nullable: true })
  qrCode?: string;

  @Column({ nullable: true })
  uniqueLink?: string;

  @Column({ type: 'timestamp', nullable: true })
  sentAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt?: Date;

  @OneToMany(() => Guest, (guest) => guest.invitation)
  guests: Guest[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}