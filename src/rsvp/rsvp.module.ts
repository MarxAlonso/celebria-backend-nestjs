import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RsvpService } from './rsvp.service';
import { RsvpController } from './rsvp.controller';
import { Rsvp } from '../database/entities/rsvp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rsvp])],
  controllers: [RsvpController],
  providers: [RsvpService],
  exports: [RsvpService],
})
export class RsvpModule {}