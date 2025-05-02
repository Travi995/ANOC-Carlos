import { Injectable } from '@nestjs/common';
import { CreateAsociateDto } from './dto/create-asociate.dto';
import { UpdateAsociateDto } from './dto/update-asociate.dto';

@Injectable()
export class AsociateService {
  create(createAsociateDto: CreateAsociateDto) {
    return 'This action adds a new asociate';
  }

  findAll() {
    return `This action returns all asociate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asociate`;
  }

  update(id: number, updateAsociateDto: UpdateAsociateDto) {
    return `This action updates a #${id} asociate`;
  }

  remove(id: number) {
    return `This action removes a #${id} asociate`;
  }
}
