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

import { AlbumService } from './album.service';
import {
  ApiOperation,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from '@prisma/client';
import { UpdateAlbumDto } from './dto/update-album.dto';

@ApiBearerAuth()
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  /**
   * Get all albums
   */
  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  getAlbums() {
    return this.albumService.getAlbums();
  }

  /**
   * Get album by id
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get album' })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album with this id does not exist' })
  async getAlbumById(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.getAlbum(id);
    if (!album) {
      throw new HttpException(
        'Album with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    return album;
  }

  /**
   * Create new album
   */
  @Post()
  @ApiOperation({ summary: 'Create album' })
  @ApiBadRequestResponse({
    description: ' Bad request. Body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.createAlbum(createAlbumDto);
  }

  /**
   * Delete album by id
   */
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete album' })
  @ApiNoContentResponse({
    description: 'The album has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album with this id does not exist' })
  async deleteAlbumById(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const album = await this.albumService.deleteAlbum(id);
      return album;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Album with this id does not exist',
          StatusCodes.NOT_FOUND,
        );
      }
      throw e;
    }
  }

  /**
   * Update album by id
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update album' })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album with this id does not exist' })
  @UsePipes(new ValidationPipe())
  async updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      const album = await this.albumService.updateAlbum(id, updateAlbumDto);
      return album;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Album with this id does not exist',
          StatusCodes.NOT_FOUND,
        );
      }
      throw e;
    }
  }
}
