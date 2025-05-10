import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBirdDto } from './dto/create-bird.dto';
import { UpdateBirdDto } from './dto/update-bird.dto';
import { BirdEntity } from './entities/bird.entity';
import { Repository } from 'typeorm';
import { statusEnum } from 'src/user/enum/status.enum';

@Injectable()
export class BirdService {
	constructor(
		@InjectRepository(BirdEntity)
		private readonly birdRepository: Repository<BirdEntity>

	) { }

	async create(createBirdDto: CreateBirdDto) {
		// conseguirse la relaciondel usuario k intenta crear el pajaro
		const item = this.birdRepository.create(createBirdDto);

		await this.birdRepository.save(item);
		return {
			msg: 'Bird created successfully',
			data: item
		}
	}

	async findAll() {
		const items = await this.birdRepository.find()

		return items
	}

	async findOneById(id: string) {
		const item = await this.birdRepository.findOneBy({ id })
		if(!item) throw new NotFoundException(`not exist bird by  id: ${id}`)

		return item
	}

	async update(id: string, updateBirdDto: UpdateBirdDto) {
		try {
			this.birdRepository.update(id, {...updateBirdDto});
			
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException('please contact the support')
		}

		return {
			msg: 'Bird updated successfully',
		};
	}

	remove(id: string) {
		this.birdRepository.update(id, {status:statusEnum.DELETED});
		return {
			msg: 'Bird deleted successfully',
		}
	}
}
