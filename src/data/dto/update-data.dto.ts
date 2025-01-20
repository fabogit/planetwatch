import { PartialType } from '@nestjs/mapped-types';
import { CreateDataDto } from './create-data.dto';

export class UpdateDatumDto extends PartialType(CreateDataDto) {}
