import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { LocalsService } from './locals.service';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';
import { ApiTags } from '@nestjs/swagger';
import { AddBirdDto } from './dto/add-bird,dto';

@ApiTags("local")
@Controller('locals')
export class LocalsController {
  constructor(private readonly localsService: LocalsService) {}

  @Post()
  create(@Body() createLocalDto: CreateLocalDto) {
    return this.localsService.create(createLocalDto);
  }

  @Post(':id/bird')
  addBird (@Param('id',ParseUUIDPipe) id:string, @Body() addBirdDto:AddBirdDto){
    return this.localsService.addBird(id,addBirdDto)
  }


  @Get()
  findAll() {
    return this.localsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.localsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocalDto: UpdateLocalDto) {
    return this.localsService.update(id, updateLocalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localsService.remove(id);
  }
}
