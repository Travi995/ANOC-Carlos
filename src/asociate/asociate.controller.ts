import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsociateService } from './asociate.service';
import { CreateAsociateDto } from './dto/create-asociate.dto';
import { UpdateAsociateDto } from './dto/update-asociate.dto';

@Controller('asociate')
export class AsociateController {
  constructor(private readonly asociateService: AsociateService) {}

  @Post()
  create(@Body() createAsociateDto: CreateAsociateDto) {
    return this.asociateService.create(createAsociateDto);
  }

  @Get()
  findAll() {
    return this.asociateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asociateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsociateDto: UpdateAsociateDto) {
    return this.asociateService.update(+id, updateAsociateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asociateService.remove(+id);
  }
}
