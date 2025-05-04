import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AsociateService } from './asociate.service';
import { CreateAsociateDto } from './dto/create-asociate.dto';
import { UpdateAsociateDto } from './dto/update-asociate.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/userRole.guard';
import { Roleprotected, ValidRoles } from 'src/auth/decorator/roleprotected.decorator';

@Controller('asociate')
export class AsociateController {
  constructor(private readonly asociateService: AsociateService) {}



  @Post()
  // @Roleprotected(ValidRoles.ADMIN)
  // @UseGuards(AuthGuard(),UserRoleGuard) //agr3wegar aki k esto lo ahce el asociado nada mas 
  create(@Body() createAsociateDto: CreateAsociateDto) {
    return this.asociateService.create(createAsociateDto);
  }

  @Get()
  findAll() {
    return this.asociateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asociateService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsociateDto: UpdateAsociateDto) {
    return this.asociateService.update(id, updateAsociateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asociateService.remove(id);
  }
}
