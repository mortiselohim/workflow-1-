import { Module } from '@nestjs/common';
import { PricingModule } from '../pricing/pricing.module';
import { TripsModule } from '../trips/trips.module';
import { TombolaModule } from '../tombola/tombola.module';
import { RatingsModule } from '../ratings/ratings.module';
import { TrackingModule } from '../tracking/tracking.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [PricingModule, TripsModule, TombolaModule, RatingsModule, TrackingModule, AdminModule],
})
export class AppModule {}
