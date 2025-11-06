import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from '../database/entities/payment.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private emailService: EmailService,
  ) {}

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async create(paymentData: Partial<Payment>): Promise<Payment> {
    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const payment = this.paymentRepository.create({
      ...paymentData,
      orderId,
      status: PaymentStatus.PENDING,
    });
    
    return this.paymentRepository.save(payment);
  }

  async update(id: string, paymentData: Partial<Payment>): Promise<Payment> {
    const payment = await this.findOne(id);
    Object.assign(payment, paymentData);
    return this.paymentRepository.save(payment);
  }

  async updateStatus(id: string, status: PaymentStatus): Promise<Payment> {
    const payment = await this.findOne(id);
    payment.status = status;
    
    if (status === PaymentStatus.COMPLETED) {
      payment.paidAt = new Date();
      
      // Send payment confirmation email
      // Note: In a real application, you would get the user's email from the user service
      // For now, we'll use a placeholder
      if (payment.userId) {
        // This is a simplified example - you would need to fetch the actual user email
        const userEmail = 'user@example.com'; // This should come from user service
        await this.emailService.sendPaymentConfirmationEmail(
          userEmail,
          payment.amount,
          payment.orderId
        );
      }
    }
    
    return this.paymentRepository.save(payment);
  }

  async remove(id: string): Promise<void> {
    const payment = await this.findOne(id);
    await this.paymentRepository.remove(payment);
  }

  async getPaymentsByUser(userId: string): Promise<Payment[]> {
    return this.paymentRepository.find({ where: { userId } });
  }

  async getPaymentsByEvent(eventId: string): Promise<Payment[]> {
    return this.paymentRepository.find({ where: { eventId } });
  }

  async getPaymentStats() {
    const payments = await this.paymentRepository.find();
    
    const stats = {
      total: payments.length,
      pending: payments.filter(p => p.status === PaymentStatus.PENDING).length,
      completed: payments.filter(p => p.status === PaymentStatus.COMPLETED).length,
      failed: payments.filter(p => p.status === PaymentStatus.FAILED).length,
      totalAmount: payments
        .filter(p => p.status === PaymentStatus.COMPLETED)
        .reduce((sum, p) => sum + parseFloat(p.amount.toString()), 0),
    };

    return stats;
  }
}