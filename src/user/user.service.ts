import { BadRequestException, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRolDto, UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RolesEnum } from './enum/rol.enum';
import * as bcrypt from 'bcrypt'
import { statusEnum } from './enum/status.enum';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) { }

	

	async create(createUserDto: CreateUserDto) {

		const amountUsers = await this.userRepository.count();
		createUserDto.password = bcrypt.hashSync(createUserDto.password,10);
		let item:UserEntity

		if(amountUsers){
			item = this.userRepository.create({
				...createUserDto,
			})
		}else{
			item = this.userRepository.create({
				...createUserDto,
				rol:RolesEnum.ADMIN
			})
		}

		try {
			await this.userRepository.save(item);
		} catch (error) {
			this.handlerError(error)
		}

		return {
			msg:'User created successfully',
			data:item
		}
  }

  	private handlerError(error: any) {
		if (error.code === '23505') {
			throw new BadRequestException('Email already exists');
		}
		throw new BadRequestException(error.message);
	}
	
	async findAll() {
		const items =  await this.userRepository.find();
		if(!items.length){
			throw new BadRequestException('No users found')
		}

		return	items 
	}

	async findOneById(id: string) {
		const item = await this.userRepository.findOneBy({id});

		if(item){
			return item
		}else{
			return new BadRequestException('User not found')
		}

	}

	async findOneByEmail(email: string) {
		const item = await this.userRepository.findOneBy({email});

		if(item){
			return {
				data:item}
		}else{
			return new BadRequestException('User not found')
		}

	}


	async update(id: string, updateUserDto: UpdateUserDto) {
		const item = await this.userRepository.findOneBy({id});
		if(!item){
			throw new BadRequestException('User not found')
		}
		await this.userRepository.update(item.id,updateUserDto)
		return {msg:'User updated successfully'}
	}

	async updateRole(id: string, updateRolDto: UpdateRolDto) {
		const item = await this.userRepository.findOneBy({id});
		if(!item){
			throw new BadRequestException('User not found')
		}
		item.rol = updateRolDto.rol
		await this.userRepository.save(item)
		return {msg:'User role updated successfully'}

	}

	async remove(id: string) {
		try{
			const item =await this.userRepository.findOneBy({id});

			if(item)this.userRepository.update(item?.id,{...item,['status']:statusEnum.DELETED})

		}catch (error){
			console.log(error)
		}
		return {msg:`user width id :${id} has been deleted`};
	}
}
