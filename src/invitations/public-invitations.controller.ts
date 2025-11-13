import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InvitationsService } from './invitations.service';

@ApiTags('public')
@Controller('public/invitations')
export class PublicInvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Get(':slug')
  @ApiOperation({ summary: 'Get public invitation by share slug' })
  @ApiResponse({ status: 200, description: 'Public invitation retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Invitation not found' })
  findBySlug(@Param('slug') slug: string) {
    return this.invitationsService.findByUniqueLink(slug);
  }
}