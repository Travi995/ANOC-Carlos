import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsociateDto } from './dto/create-asociate.dto';
import { UpdateAsociateDto } from './dto/update-asociate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AsociateEntity } from './entities/asociate.entity';
import { Not, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AsociateService {
	constructor(
		@InjectRepository(AsociateEntity)
		private readonly asociateRepository: Repository<AsociateEntity>,

		private readonly userService: UserService

	) { }

	async create(createAsociateDto: CreateAsociateDto) {
		const { email, password, ...asociateData } = createAsociateDto

		const user = await this.userService.create({
			email,
			password
		})
		const item = this.asociateRepository.create({ ...asociateData, user: user.data });
		await this.asociateRepository.save(item);

		return {
			msg: 'user has been created',
			item
		}
	}

	async findAll() {
		const data = await this.asociateRepository.find()
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
