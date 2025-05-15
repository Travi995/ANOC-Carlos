import { Module } from '@nestjs/common';
import { AsociateService } from './asociate.service';
import { AsociateController } from './asociate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsociateEntity } from './entities/asociate.entity';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AsociateEntity,UserEntity]),
  UserModule],
  controllers: [AsociateController],
  providers: [AsociateService],
})
export class AsociateModule {}
