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

  async getAllData(): Promise<DataTable[]> {
    return this.prismaService.dataTable.findMany().catch(() => {
      throw new InternalServerErrorException('Failed to retrieve data.');
    });
  }

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
