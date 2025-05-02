import { Module } from '@nestjs/common';
import { AsociateService } from './asociate.service';
import { AsociateController } from './asociate.controller';

@Module({
  controllers: [AsociateController],
  providers: [AsociateService],
})
export class AsociateModule {}
