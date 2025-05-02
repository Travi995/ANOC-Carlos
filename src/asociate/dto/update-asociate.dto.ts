import { PartialType } from '@nestjs/swagger';
import { CreateAsociateDto } from './create-asociate.dto';

export class UpdateAsociateDto extends PartialType(CreateAsociateDto) {}
