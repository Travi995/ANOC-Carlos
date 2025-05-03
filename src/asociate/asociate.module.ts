import { Module } from '@nestjs/common';
import { AsociateService } from './asociate.service';
import { AsociateController } from './asociate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsociateEntity } from './entities/asociate.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([AsociateEntity]),
  UserModule],
  controllers: [AsociateController],
  providers: [AsociateService],
})
export class AsociateModule {}
