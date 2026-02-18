import { Module } from '@nestjs/common';
import { TombolaController } from './tombola.controller';

@Module({ controllers: [TombolaController] })
export class TombolaModule {}
