import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataTable } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DataService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  // Method to write data to the database
  async createData(data: {
    name: string;
    value: string;
    required: boolean;
  }): Promise<DataTable> {
    const { name, value, required } = data;
    try {
      return await this.prisma.dataTable.create({
        data: {
          DataName: name,
          DataValue: value,
          DataRequired: required,
        },
      });
    } catch (error) {
      // Handle unique constraint violation (name already exists)
      if (error.code === 'P2002') {
        throw new Error(`Data with name "${name}" already exists.`);
      }
      throw error;
    }
  }

  // Method to read all data from the database
  async getAllData(): Promise<DataTable[]> {
    try {
      return this.prisma.dataTable.findMany();
    } catch (error) {
      throw error;
    }
  }

  async updateData(
    name: string,
    update: { value?: string; required?: boolean },
  ): Promise<DataTable> {
    try {
      return await this.prisma.dataTable.update({
        where: { DataName: name },
        data: {
          ...(update.value !== undefined && { DataValue: update.value }),
          ...(update.required !== undefined && {
            DataRequired: update.required,
          }),
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error(`Data with name "${name}" not found.`);
      }
      throw error;
    }
  }

  // Method to delete data by name
  async deleteData(name: string): Promise<DataTable> {
    try {
      return await this.prisma.dataTable.delete({
        where: { DataName: name },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error(`Data with name "${name}" not found.`);
      }
      throw error;
    }
  }

  // Method to get the custom "env" variable
  async getEnvVariable(envVariable: string): Promise<string> {
    try {
      return (
        this.configService.get<string>(envVariable) || 'Variable not found'
      );
    } catch (error) {
      throw error;
    }
  }
}
