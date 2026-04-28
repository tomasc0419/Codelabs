/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { MuseumDto } from './museum.dto';
import { MuseumEntity } from './museum.entity';
import { MuseumService } from './museum.service';
import { MuseumQueryDto } from './museum-query.dto';

@Controller('museums')
@UseInterceptors(BusinessErrorsInterceptor)
export class MuseumController {
  constructor(private readonly museumService: MuseumService) {}

  @Get()
  async findAll(
    @Query() query: MuseumQueryDto,
  ): Promise<MuseumEntity[]> {
    return await this.museumService.findAll(query);
  }

  @Get(':museumId')
  async findOne(
    @Param('museumId') museumId: string,
  ): Promise<MuseumEntity> {
    return await this.museumService.findOne(museumId);
  }

  @Post()
  async create(
    @Body() museumDto: MuseumDto,
  ): Promise<MuseumEntity> {
    const museum = plainToInstance(
      MuseumEntity,
      museumDto,
    );

    return await this.museumService.create(museum);
  }

  @Put(':museumId')
  async update(
    @Param('museumId') museumId: string,
    @Body() museumDto: MuseumDto,
  ): Promise<MuseumEntity> {
    const museum = plainToInstance(
      MuseumEntity,
      museumDto,
    );

    return await this.museumService.update(museumId, museum);
  }

  @Delete(':museumId')
  @HttpCode(204)
  async delete(
    @Param('museumId') museumId: string,
  ): Promise<void> {
    return await this.museumService.delete(museumId);
  }
}