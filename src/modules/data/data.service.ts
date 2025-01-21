import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataTable } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DataService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Create a new data entry in the database.
   * @param data - The data to create, including name, value, and required flag.
   * @returns The created data entry.
   * @throws ConflictException if a data entry with the same name already exists.
   * @throws InternalServerErrorException if an unexpected error occurs.
   */
  async createData(data: {
    name: string;
    value: string;
    required: boolean;
  }): Promise<DataTable> {
    const { name, value, required } = data;
    return this.prismaService.dataTable
      .create({
        data: {
          DataName: name,
          DataValue: value,
          DataRequired: required,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Data with name "${name}" already exists.`,
          );
        }
        throw new InternalServerErrorException('Failed to create data.');
      });
  }

  /**
   * Retrieve all data entries from the database.
   * @returns An array of all data entries.
   * @throws InternalServerErrorException if an unexpected error occurs.
   */
  async getAllData(): Promise<DataTable[]> {
    return this.prismaService.dataTable.findMany().catch(() => {
      throw new InternalServerErrorException('Failed to retrieve data.');
    });
  }

  /**
   * Update an existing data entry by its name.
   * @param name - The name of the data entry to update.
   * @param update - The fields to update, such as value or required flag.
   * @returns The updated data entry.
   * @throws NotFoundException if no data entry with the specified name exists.
   * @throws InternalServerErrorException if an unexpected error occurs.
   */
  async updateData(
    name: string,
    update: { value?: string; required?: boolean },
  ): Promise<DataTable> {
    return this.prismaService.dataTable
      .update({
        where: { DataName: name },
        data: {
          ...(update.value !== undefined && { DataValue: update.value }),
          ...(update.required !== undefined && {
            DataRequired: update.required,
          }),
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Data with name "${name}" not found.`);
        }
        throw new InternalServerErrorException('Failed to update data.');
      });
  }

  /**
   * Delete a data entry by its name.
   * @param name - The name of the data entry to delete.
   * @returns The deleted data entry.
   * @throws NotFoundException if no data entry with the specified name exists.
   * @throws InternalServerErrorException if an unexpected error occurs.
   */
  async deleteData(name: string): Promise<DataTable> {
    return this.prismaService.dataTable
      .delete({
        where: { DataName: name },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Data with name "${name}" not found.`);
        }
        throw new InternalServerErrorException('Failed to delete data.');
      });
  }

  /**
   * Retrieve the value of a specified environment variable.
   * @param envVariable - The key of the environment variable to retrieve.
   * @returns The value of the environment variable.
   * @throws NotFoundException if the environment variable is not found.
   */
  async getEnvVariable(envVariable: string): Promise<string> {
    const value = this.configService.get<string>(envVariable);
    if (!value) {
      throw new NotFoundException(
        `Environment variable "${envVariable}" not found.`,
      );
    }
    return value;
  }
}
