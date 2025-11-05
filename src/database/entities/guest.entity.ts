import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Invitation } from './invitation.entity';

export enum GuestStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  DECLINED = 'declined',
  MAYBE = 'maybe',
}

export enum GuestType {
  ADULT = 'adult',
  CHILD = 'child',
  INFANT = 'infant',
}

@Entity('guests')
export class Guest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({
    type: 'enum',
    enum: GuestType,
    default: GuestType.ADULT,
  })
  type: GuestType;

  @Column({
    type: 'enum',
    enum: GuestStatus,
    default: GuestStatus.PENDING,
  })
  status: GuestStatus;

  @Column({ nullable: true })
  plusOne?: boolean;

  @Column({ nullable: true })
  plusOneName?: string;

  @Column({ type: 'text', nullable: true })
  dietaryRestrictions?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'uuid' })
  invitationId: string;

  @ManyToOne(() => Invitation, (invitation) => invitation.guests)
  @JoinColumn({ name: 'invitationId' })
  invitation: Invitation;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}