import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
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

		return item
	}

	async update(id: string, updateBirdDto: UpdateBirdDto) {
		this.birdRepository.update(id, {...updateBirdDto});

		return {
			msg: 'Bird updated successfully',
		};
	}

	remove(id: string) {
		this.birdRepository.update(id, {status:statusEnum.DELETED});
		//  averiguar si el pajaro se puede borrar por completo o se marca con un status de eliminado
		return {
			msg: 'Bird deleted successfully',
		}
	}
}
