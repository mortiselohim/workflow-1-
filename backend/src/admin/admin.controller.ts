import { Controller, Get } from '@nestjs/common';

@Controller('v1/admin')
export class AdminController {
  @Get('users')
  users() {
    return [{ id: 'u1', role: 'PASSENGER' }, { id: 'u2', role: 'RIDER' }];
  }

  @Get('trips')
  trips() {
    return [{ id: 'trip_1', status: 'COMPLETED', serviceType: 'RIDE' }];
  }
}
