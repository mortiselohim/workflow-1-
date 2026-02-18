import { Injectable } from '@nestjs/common';

export interface FareInput {
  distanceKm: number;
  durationMin: number;
  baseFare: number;
  perKm: number;
  perMin: number;
  minimumFare: number;
  surgeMultiplier?: number;
  promoDiscount?: number;
}

@Injectable()
export class PricingService {
  estimateFare(input: FareInput) {
    const surge = input.surgeMultiplier ?? 1;
    const subtotal = (input.baseFare + input.distanceKm * input.perKm + input.durationMin * input.perMin) * surge;
    const withMinimum = Math.max(subtotal, input.minimumFare);
    const total = Math.max(withMinimum - (input.promoDiscount ?? 0), 0);
    return { currency: 'MAD', subtotal, total, surge };
  }
}
