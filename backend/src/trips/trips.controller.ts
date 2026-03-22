import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('v1/trips')
export class TripsController {
  @Post()
  create(@Body() body: any) {
    return { id: 'trip_demo_1', status: 'REQUESTED', ...body };
  }

  @Get(':id')
  getTrip(@Param('id') id: string) {
    return { id, status: 'ACCEPTED', serviceType: 'RIDE' };
  }

  @Post(':id/accept')
  accept(@Param('id') id: string) {
    return { id, status: 'ACCEPTED' };
  }

  @Post(':id/arrive')
  arrive(@Param('id') id: string) {
    return { id, status: 'ARRIVED' };
  }

  @Post(':id/start')
  start(@Param('id') id: string) {
    return { id, status: 'STARTED' };
  }

  @Post(':id/complete')
  complete(@Param('id') id: string) {
    return { id, status: 'COMPLETED' };
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string) {
    return { id, status: 'CANCELED' };
  }

  @Post(':id/proof-delivery')
  proof(@Param('id') id: string, @Body() body: any) {
    return { id, proof: body, ok: true };
  }
}
