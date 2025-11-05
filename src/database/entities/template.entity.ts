import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Event } from './event.entity';

export enum TemplateType {
  WEDDING_CLASSIC = 'wedding_classic',
  WEDDING_MODERN = 'wedding_modern',
  BIRTHDAY_FUN = 'birthday_fun',
  BIRTHDAY_ELEGANT = 'birthday_elegant',
  CORPORATE_FORMAL = 'corporate_formal',
  CORPORATE_CASUAL = 'corporate_casual',
  CUSTOM = 'custom',
}

export enum TemplateStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
}

@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: TemplateType })
  type: TemplateType;

  @Column({ type: 'enum', enum: TemplateStatus, default: TemplateStatus.ACTIVE })
  status: TemplateStatus;

  @Column({ type: 'jsonb' })
  design: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
    layout: string;
    customCss?: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  content?: {
    header?: string;
    body?: string;
    footer?: string;
    images?: string[];
  };

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ nullable: true })
  previewImage?: string;

  @Column({ type: 'uuid', nullable: true })
  eventId?: string;

  @ManyToOne(() => Event, (event) => event.templates)
  @JoinColumn({ name: 'eventId' })
  event?: Event;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
