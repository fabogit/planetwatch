import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateDataDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsBoolean()
  required: boolean;
}
