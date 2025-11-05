import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from '../database/entities/template.entity';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private templateRepository: Repository<Template>,
  ) {}

  async findAll(): Promise<Template[]> {
    return this.templateRepository.find({ relations: ['event'] });
  }

  async findOne(id: string): Promise<Template> {
    const template = await this.templateRepository.findOne({ 
      where: { id },
      relations: ['event'] 
    });
    if (!template) {
      throw new NotFoundException('Template not found');
    }
    return template;
  }

  async create(templateData: Partial<Template>): Promise<Template> {
    const template = this.templateRepository.create(templateData);
    return this.templateRepository.save(template);
  }

  async update(id: string, templateData: Partial<Template>): Promise<Template> {
    const template = await this.findOne(id);
    Object.assign(template, templateData);
    return this.templateRepository.save(template);
  }

  async remove(id: string): Promise<void> {
    const template = await this.findOne(id);
    await this.templateRepository.remove(template);
  }
}