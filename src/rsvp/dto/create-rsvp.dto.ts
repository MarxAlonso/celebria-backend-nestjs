import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RsvpStatus } from '../../database/entities/rsvp.entity';

export class CreateRsvpDto {
  @ApiProperty({ description: 'Guest ID' })
  @IsUUID()
  guestId: string;

  @ApiProperty({ description: 'Invitation ID' })
  @IsUUID()
  invitationId: string;

  @ApiProperty({ description: 'RSVP status', enum: RsvpStatus })
  @IsEnum(RsvpStatus)
  status: RsvpStatus;

  @ApiProperty({ description: 'Additional notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'Number of guests attending', required: false })
  @IsOptional()
  numberOfGuests?: number;
}