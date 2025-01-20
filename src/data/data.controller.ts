import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDataDto } from './dto/create-data.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UpdateDataDto } from './dto/update-data.dto';

@ApiTags('data')
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @ApiOperation({ summary: 'Create a new data entry' })
  @Post()
  async createData(@Body() createDataDto: CreateDataDto) {
    return this.dataService.createData(createDataDto);
  }

  @ApiOperation({ summary: 'Get all data entries' })
  @Get()
  async getAllData() {
    return this.dataService.getAllData();
  }

  @ApiOperation({ summary: 'Update an existing data entry by name' })
  @Patch(':name')
  async updateData(
    @Param('name') name: string,
    @Body() updateDataDto: UpdateDataDto,
  ) {
    return this.dataService.updateData(name, updateDataDto);
  }

  @ApiOperation({ summary: 'Delete a data entry by name' })
  @Delete(':name')
  async deleteData(@Param('name') name: string) {
    return this.dataService.deleteData(name);
  }

  @ApiOperation({ summary: 'Get the value of an environment variable' })
  @Get('env')
  async getEnvVariable(@Query('key') key: string) {
    return this.dataService.getEnvVariable(key);
  }
}
