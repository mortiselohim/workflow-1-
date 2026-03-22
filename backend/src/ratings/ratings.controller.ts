import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('v1')
export class RatingsController {
  @Post('ratings')
  rate(@Body() body: any) {
    return { ok: true, ...body };
  }

  @Get('rewards/levels')
  levels() {
    return [
      { level: 1, minCompleted: 0, minRating: 0, matchingRadiusKm: 2 },
      { level: 2, minCompleted: 50, minRating: 4.6, matchingRadiusKm: 3.5 },
      { level: 3, minCompleted: 150, minRating: 4.7, matchingRadiusKm: 5 },
    ];
  }
}
