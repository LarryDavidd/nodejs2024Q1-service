import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Body,
  Delete,
  HttpException,
  Put,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { TrackService } from './track.service';
import {
  ApiOperation,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from '@prisma/client';
import { UpdateTrackDto } from './dto/update-track.dto';

@ApiBearerAuth()
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  /**
   * Get all tracks
   */
  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  getTracks() {
    return this.trackService.getTracks();
  }

  /**
   * Get track by id
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get track' })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track with this id does not exist' })
  async getTrackById(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.getTrack(id);
    if (!track) {
      throw new HttpException(
        'Track with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    return track;
  }

  /**
   * Create new track
   */
  @Post()
  @ApiOperation({ summary: 'Create track' })
  @ApiBadRequestResponse({
    description: ' Bad request. Body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.createTrack(createTrackDto);
  }

  /**
   * Delete track by id
   */
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete track' })
  @ApiNoContentResponse({
    description: 'The track has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track with this id does not exist' })
  async deleteTrackById(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const track = await this.trackService.deleteTrack(id);
      return track;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Track with this id does not exist',
          StatusCodes.NOT_FOUND,
        );
      }
      throw e;
    }
  }

  /**
   * Update track by id
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update track' })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track with this id does not exist' })
  @UsePipes(new ValidationPipe())
  async updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      const track = await this.trackService.updateTrack(id, updateTrackDto);
      return track;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Track with this id does not exist',
          StatusCodes.NOT_FOUND,
        );
      }
      throw e;
    }
  }
}
