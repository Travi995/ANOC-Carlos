import {  ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsociateDto } from './dto/create-asociate.dto';
import { UpdateAsociateDto } from './dto/update-asociate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AsociateEntity } from './entities/asociate.entity';
import {  Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { UserEntity } from 'src/user/entities/user.entity';
import { Roleprotected, ValidRoles } from 'src/auth/decorator/roleprotected.decorator';

@Injectable()
export class AsociateService {
	constructor(
		@InjectRepository(AsociateEntity)
		private readonly asociateRepository: Repository<AsociateEntity>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,

		private readonly userService: UserService

	) { }

	async create(createAsociateDto: CreateAsociateDto) {
		const { email, password, ...asociateData } = createAsociateDto

		
		const item = this.asociateRepository.create({
			 ...asociateData, 
			 user: {
				email,
				password:bcrypt.hashSync(createAsociateDto.password,10),
				rol:ValidRoles.ASOCIATE
			} });
		await this.asociateRepository.save(item);

		return {
			msg: 'user has been created',
			item
		}
	}

	async findAll() {
		const data = await this.asociateRepository.find({
			relations:['user']
		})
		if (!data.length) {
			throw new NotFoundException('No asociates found')
		}
		return data
	}

	async findOneById(id: string) {
		const data = await this.asociateRepository.findOne({ where:{id},relations:['user']})
		if (!data) {
			throw new NotFoundException('Asociate not found')
		}
		return data
	}

	async update(id: string, updateAsociateDto: UpdateAsociateDto) {
		const { email, password, ...asociateData } = updateAsociateDto

		const asociate = await this.findOneById(id)

		if (!asociate) throw new NotFoundException('Asociate not found')

		if (email || password) {
			 this.userService.update(asociate.user.id, { email, password })
		}


		if (asociateData.apellido || asociateData.nombre || asociateData.direction) {
			 await this.asociateRepository.update(id, asociateData)
		}

		const updateAsociate = await this.findOneById(id)

		return {
			msg: 'Asociate updated successfully',
			data:updateAsociate
		};
	}

	async remove(id: string) {
		const asociate = await this.findOneById(id)
		if(!asociate){
			throw new NotFoundException('Asociate not found')
		}
		this.userService.remove(asociate.user.id)
		


		return `This action removes a #${id} asociate`;
	}
}
