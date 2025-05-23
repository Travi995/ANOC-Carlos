import { Module } from '@nestjs/common';
import { LocalsService } from './locals.service';
import { LocalsController } from './locals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalEntity } from './entities/local.entity';
import { BirdModule } from 'src/bird/bird.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocalEntity]),
    BirdModule
  ],
  controllers: [LocalsController],
  providers: [LocalsService],
})
export class LocalsModule {}
