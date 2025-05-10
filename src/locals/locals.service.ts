import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalEntity } from './entities/local.entity';
import { Repository } from 'typeorm';
import { AddBirdDto } from './dto/add-bird,dto';
import { BirdService } from 'src/bird/bird.service';

@Injectable()
export class LocalsService {
	constructor(
		@InjectRepository(LocalEntity)
		private readonly LocalRepository: Repository<LocalEntity>,
		private readonly birdService: BirdService
	) { }

	async create(createLocalDto: CreateLocalDto) {
		const item = this.LocalRepository.create(createLocalDto)
		await this.LocalRepository.save(item)

		return {
			msg: "Local has been created ",
			data: item
		}
	}

	async addBird (id:string,AddBirdDto:AddBirdDto){
		const item = await   this.LocalRepository.findOneBy({id})
		const bird  = await this.birdService.findOneById(id)

		if(!item )throw new NotFoundException('local  not found')
		item.bird.push(bird)
		await this.LocalRepository.save(item)
		return {
			msg:'bird add whit exit',
			data:item
		}

	}

	async findAll() {
		const data = await this.LocalRepository.find({
			where: {},
			relations: ['bird', 'manager']
		})

		return data
	}

	async findOne(id: string) {
		const item = await this.LocalRepository.findOne({
			where: { id },
			relations: [
				'bird',
				'manager'
			]
		})

		if (!item) throw new NotFoundException(`Local Not Found by id: ${id}`)
		return item
	}

	async update(id: string, updateLocalDto: UpdateLocalDto) {
		
		const item = await this.LocalRepository.findOneBy({ id })

		if (!item) throw new NotFoundException(`Local Not Found by id: ${id}`)

		await this.LocalRepository.update(item.id,UpdateLocalDto)
			return {
				msg:"Local has been updated"
			};
	}

	async remove(id: string) {
		const item = await this.LocalRepository.findOneBy({ id })

		if (!item) throw new NotFoundException(`Local Not Found by id: ${id}`)

		await this.LocalRepository.update(item.id,{})
			return {
				msg:"Local has been deleted"
			};
	}
}
