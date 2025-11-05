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
import { Template } from './template.entity';
import { Invitation } from './invitation.entity';

export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum EventType {
  WEDDING = 'wedding',
  BIRTHDAY = 'birthday',
  CORPORATE = 'corporate',
  GRADUATION = 'graduation',
  OTHER = 'other',
}

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: EventType })
  type: EventType;

  @Column({ type: 'enum', enum: EventStatus, default: EventStatus.DRAFT })
  status: EventStatus;

  @Column({ type: 'timestamp' })
  eventDate: Date;

  @Column({ nullable: true })
  location?: string;

  @Column({ type: 'jsonb', nullable: true })
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  settings?: Record<string, any>;

  @Column({ nullable: true })
  coverImage?: string;

  @Column({ type: 'uuid' })
  organizerId: string;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn({ name: 'organizerId' })
  organizer: User;

  @OneToMany(() => Template, (template) => template.event)
  templates: Template[];

  @OneToMany(() => Invitation, (invitation) => invitation.event)
  invitations: Invitation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}