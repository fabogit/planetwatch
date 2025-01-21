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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateDataDto } from './dto/update-data.dto';

@ApiTags('data')
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  /**
   * Create a new data entry.
   * @param createDataDto - Data to be created.
   * @returns The created data entry.
   */
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

  /**
   * Retrieve all data entries.
   * @returns An array of all data entries.
   */
  @ApiOperation({ summary: 'Get all data entries' })
  @ApiResponse({ status: 200, description: 'Data retrieved successfully.' })
  @Get()
  async getAllData() {
    return this.dataService.getAllData();
  }

  /**
   * Update an existing data entry by name.
   * @param name - Name of the data entry to update.
   * @param updateDataDto - Updated data values.
   * @returns The updated data entry.
   */
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

  /**
   * Delete a data entry by name.
   * @param name - Name of the data entry to delete.
   * @returns The deleted data entry.
   */
  @ApiOperation({ summary: 'Delete a data entry by name' })
  @ApiResponse({ status: 200, description: 'Data deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Data not found.' })
  @Delete(':name')
  async deleteData(@Param('name') name: string) {
    return this.dataService.deleteData(name);
  }

  /**
   * Get the value of an environment variable.
   * @param key - The key of the environment variable.
   * @returns The value of the environment variable.
   * @throws Error if the key is missing.
   */
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
