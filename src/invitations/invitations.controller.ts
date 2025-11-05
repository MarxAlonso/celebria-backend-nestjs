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
import { InvitationsService } from './invitations.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('invitations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new invitation' })
  @ApiResponse({ status: 201, description: 'Invitation created successfully' })
  create(@Body() invitationData: any) {
    return this.invitationsService.create(invitationData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all invitations' })
  @ApiResponse({ status: 200, description: 'Invitations retrieved successfully' })
  findAll() {
    return this.invitationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get invitation by ID' })
  @ApiResponse({ status: 200, description: 'Invitation retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Invitation not found' })
  findOne(@Param('id') id: string) {
    return this.invitationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update invitation' })
  @ApiResponse({ status: 200, description: 'Invitation updated successfully' })
  update(@Param('id') id: string, @Body() invitationData: any) {
    return this.invitationsService.update(id, invitationData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete invitation' })
  @ApiResponse({ status: 200, description: 'Invitation deleted successfully' })
  remove(@Param('id') id: string) {
    return this.invitationsService.remove(id);
  }

  @Post(':id/guests')
  @ApiOperation({ summary: 'Add guest to invitation' })
  @ApiResponse({ status: 201, description: 'Guest added successfully' })
  addGuest(@Param('id') id: string, @Body() guestData: any) {
    return this.invitationsService.addGuest(id, guestData);
  }
}