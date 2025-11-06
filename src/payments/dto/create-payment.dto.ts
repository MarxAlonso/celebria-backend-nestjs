import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod, PaymentStatus } from '../database/entities/payment.entity';

export class CreatePaymentDto {
  @ApiProperty({ description: 'User ID' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'Event ID', required: false })
  @IsOptional()
  @IsUUID()
  eventId?: string;

  @ApiProperty({ description: 'Amount to pay' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Currency (default: PEN)', required: false })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ description: 'Payment method', enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({ description: 'Payment description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Payment metadata', required: false })
  @IsOptional()
  metadata?: Record<string, any>;
}