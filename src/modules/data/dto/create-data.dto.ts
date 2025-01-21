import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a new data entry.
 */
export class CreateDataDto {
  /**
   * The unique name of the data.
   * @example "exampleName"
   */
  @ApiProperty({
    description: 'The unique name of the data',
    example: 'exampleName',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * The value associated with the data.
   * @example "exampleValue"
   */
  @ApiProperty({
    description: 'The value associated with the data',
    example: 'exampleValue',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  /**
   * Indicates whether this data is required.
   * @example true
   */
  @ApiProperty({ description: 'Whether this data is required', example: true })
  @IsBoolean()
  required: boolean;
}
