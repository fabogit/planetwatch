import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Delete,
  Param,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDataDto } from './dto/create-data.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateDataDto } from './dto/update-data.dto';

@ApiTags('data')
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @ApiOperation({ summary: 'Create a new data entry' })
  @ApiResponse({ status: 201, description: 'Data created successfully.' })
  @ApiResponse({
    status: 409,
    description: 'Data with this name already exists.',
  })
  @Post()
  async createData(@Body() createDataDto: CreateDataDto) {
    return this.dataService.createData(createDataDto);
  }

  @ApiOperation({ summary: 'Get all data entries' })
  @ApiResponse({ status: 200, description: 'Data retrieved successfully.' })
  @Get()
  async getAllData() {
    return this.dataService.getAllData();
  }

  @ApiOperation({ summary: 'Update an existing data entry by name' })
  @ApiResponse({ status: 200, description: 'Data updated successfully.' })
  @ApiResponse({ status: 404, description: 'Data not found.' })
  @Patch(':name')
  async updateData(
    @Param('name') name: string,
    @Body() updateDataDto: UpdateDataDto,
  ) {
    return this.dataService.updateData(name, updateDataDto);
  }

  @ApiOperation({ summary: 'Delete a data entry by name' })
  @ApiResponse({ status: 200, description: 'Data deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Data not found.' })
  @Delete(':name')
  async deleteData(@Param('name') name: string) {
    return this.dataService.deleteData(name);
  }

  @ApiOperation({ summary: 'Get the value of an environment variable' })
  @ApiResponse({
    status: 200,
    description: 'Environment variable retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Environment variable not found.' })
  @Get('env')
  async getEnvVariable(@Query('key') key: string) {
    if (!key) {
      throw new Error('Query parameter "key" is required.');
    }
    return this.dataService.getEnvVariable(key);
  }
}
