import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { EpisodeService } from '../services/episode.service';
import { CreateEpisodeDto } from '../entities/dto/create-episode.dto';
import { UpdateEpisodeDto } from '../entities/dto/update-episode.dto';

@Controller('episodes')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get()
  async findAll(@Query('seasson') seasson?: number) {
    if (seasson) {
      return await this.episodeService.findAllBySeasson(seasson);
    }
    return await this.episodeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.episodeService.findOne(id);
  }

  @Post()
  async create(@Body() createEpisodeDto: CreateEpisodeDto) {
    return await this.episodeService.create(createEpisodeDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEpisodeDto: UpdateEpisodeDto,
  ) {
    return await this.episodeService.update(id, updateEpisodeDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.episodeService.remove(id);
  }
}
