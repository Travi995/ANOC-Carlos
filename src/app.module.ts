import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { AsociateModule } from './asociate/asociate.module';
import { AsociateEntity } from './asociate/entities/asociate.entity';
import { BirdModule } from './bird/bird.module';
import { BirdEntity } from './bird/entities/bird.entity';
import { LocalsModule } from './locals/locals.module';
import { LocalEntity } from './locals/entities/local.entity';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5433') ,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities:[UserEntity,AsociateEntity,BirdEntity,LocalEntity ],
      synchronize: true,
      // dropSchema: true,
      // logging: true,
    }),
    AuthModule,
    UserModule,
    AsociateModule,
    BirdModule,
    LocalsModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
