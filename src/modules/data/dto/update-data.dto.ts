import { PartialType } from '@nestjs/mapped-types';
import { CreateDataDto } from './create-data.dto';

/**
 * Data Transfer Object for updating an existing data entry.
 *
 * This class extends `CreateDataDto`, making all fields optional for updates.
 */
export class UpdateDataDto extends PartialType(CreateDataDto) {}
