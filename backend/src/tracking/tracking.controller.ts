import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('v1/tracking')
export class TrackingController {
  @Post('location')
  updateLocation(@Body() body: any) {
    return { ok: true, ...body };
  }

  @Get('trips/:id/live')
  getLive(@Param('id') id: string) {
    return { tripId: id, riderLocation: { lat: 33.5731, lng: -7.5898 }, status: 'STARTED' };
  }
}
