import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/register.dto';
import { LoginAuthDTO } from './dto/login.dto';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtPayload } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) { }

	async register(createAuthDto: CreateAuthDto) {

		const amountUsers = await this.userRepository.count();
		if (amountUsers) {
			throw new BadRequestException('Please Contact width Admin our Support');
		} 
		return this.userService.create(createAuthDto)
	}

	async login(loginDto: LoginAuthDTO) {
		const { email, password } = loginDto
		const user = await this.userRepository.findOne(
			{
				where: { email },
				select: ['password', 'rol', 'id', 'email']
			}
		)

		if (user) {
			if (bcrypt.compareSync(password, user.password)) {
				return {
					msg: 'Login Successfully',
					token:this.generateJWt({id:user.id,rol:user.rol})
				}
			} 
		} 
			 throw new BadRequestException('Credentials Invalid')
		
	}

	private generateJWt(payload: JwtPayload) {
		return this.jwtService.sign(payload)
	}
}

