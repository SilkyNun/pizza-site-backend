import { Module } from '@nestjs/common';
import { AdditiveService } from './additive.service';
import { AdditiveController } from './additive.controller';

@Module({
  controllers: [AdditiveController],
  providers: [AdditiveService]
})
export class AdditiveModule {}
