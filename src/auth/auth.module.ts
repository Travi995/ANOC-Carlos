import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService) => {
				return {
					secret: configService.get('SECRET_KEY'),
					signOptions: {
						expiresIn: configService.get('TOKEN_EXPIRE'),
					},
				};
			},
		}),
		TypeOrmModule.forFeature([UserEntity]),
		UserModule,
		PassportModule.register({
			defaultStrategy: 'jwt',
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JWTStrategy],
	exports: [JWTStrategy, PassportModule, JwtModule]
})
export class AuthModule { }
