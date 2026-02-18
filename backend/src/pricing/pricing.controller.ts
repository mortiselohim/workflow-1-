import { Body, Controller, Get, Post } from '@nestjs/common';
import { PricingService } from './pricing.service';

@Controller('v1/pricing')
export class PricingController {
  constructor(private readonly pricing: PricingService) {}

  @Get('tiers')
  getTiers() {
    return [
      { key: 'standard', baseFare: 7, perKm: 2.5, perMin: 0.7, minimumFare: 12 },
      { key: 'premium', baseFare: 10, perKm: 3.5, perMin: 1, minimumFare: 18 },
      { key: 'top-tier', baseFare: 14, perKm: 4.5, perMin: 1.2, minimumFare: 24 },
    ];
  }

  @Post('estimate')
  estimate(@Body() body: any) {
    return this.pricing.estimateFare(body);
  }
}
