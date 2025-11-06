import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RsvpService } from './rsvp.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('rsvp')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rsvp')
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new RSVP' })
  @ApiResponse({ status: 201, description: 'RSVP created successfully' })
  create(@Body() rsvpData: any) {
    return this.rsvpService.create(rsvpData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all RSVPs' })
  @ApiResponse({ status: 200, description: 'RSVPs retrieved successfully' })
  findAll() {
    return this.rsvpService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get RSVP by ID' })
  @ApiResponse({ status: 200, description: 'RSVP retrieved successfully' })
  @ApiResponse({ status: 404, description: 'RSVP not found' })
  findOne(@Param('id') id: string) {
    return this.rsvpService.findOne(id);
  }

  @Get('invitation/:invitationId/stats')
  @ApiOperation({ summary: 'Get RSVP statistics for an invitation' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  getStats(@Param('invitationId') invitationId: string) {
    return this.rsvpService.getRsvpStats(invitationId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update RSVP' })
  @ApiResponse({ status: 200, description: 'RSVP updated successfully' })
  update(@Param('id') id: string, @Body() rsvpData: any) {
    return this.rsvpService.update(id, rsvpData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete RSVP' })
  @ApiResponse({ status: 200, description: 'RSVP deleted successfully' })
  remove(@Param('id') id: string) {
    return this.rsvpService.remove(id);
  }
}