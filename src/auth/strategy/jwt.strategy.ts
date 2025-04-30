
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { JwtPayload } from "../interfaces/jwt.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { statusEnum } from "src/user/enum/status.enum";


@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        configService: ConfigService
    ) {
        const secret = configService.get<string>('SECRET_KEY') ?? 'va10r_p0r_d&fecto';
        super({
            secretOrKey: secret,
            jwtFromRequest:ExtractJwt.fromHeader('token')
        })
    }

    async validate (payload: JwtPayload):Promise<UserEntity> {
        const {id} = payload
        const user = await this.userRepository.findOneBy({id})

        if(user && user.status === statusEnum.ACTIVE ){
            return user
            
        }
        throw new UnauthorizedException('token Invalid')
    }
}