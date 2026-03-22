import { Controller, Get, Post } from '@nestjs/common';

@Controller('v1')
export class TombolaController {
  @Get('tombola/rider/progress')
  riderProgress() {
    return { completedRides: 72, ratingLast50: 4.8, eligible: false, entryGranted: false };
  }

  @Get('tombola/passenger/progress')
  passengerProgress() {
    return { completedRides: 12, textReviews: 9, eligible: false, entryGranted: false };
  }

  @Post('admin/tombola/draw')
  draw() {
    return { drawId: 'draw_001', winners: [] };
  }
}
