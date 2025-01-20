import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDataDto } from './dto/create-data.dto';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  async createData(@Body() createDataDto: CreateDataDto) {
    return this.dataService.createData(createDataDto);
  }

  @Get()
  async getAllData() {
    return this.dataService.getAllData();
  }

  @Get('env')
  async getEnvVariable(@Query('key') key: string) {
    return this.dataService.getEnvVariable(key);
  }
}
