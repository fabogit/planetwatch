import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDataDto {
  @ApiProperty({ description: 'The unique name of the data' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The value associated with the data' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({ description: 'Whether this data is required', example: true })
  @IsBoolean()
  required: boolean;
}
