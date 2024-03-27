import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { StatusCodes } from 'http-status-codes';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  /**
   * Get all favorites tracks, artists, albums
   */
  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  getFavs() {
    return this.favoritesService.getFavorites();
  }

  /**
   * Add track to favorites by track id
   */
  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiCreatedResponse({
    description: 'The track was added to favorites',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Track with this id does not exist',
  })
  async addTrackToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const result = await this.favoritesService.addTrackToFavorites(id);
      return result;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Track with this id does not exist',
          StatusCodes.UNPROCESSABLE_ENTITY,
        );
      }
      throw e;
    }
  }

  /**
   * Delete track from favorites by track id
   */
  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiNoContentResponse({
    description: 'The track has been deleted from favorites',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track with this id does not exist' })
  async deleteTrackFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const track = await this.favoritesService.deleteTrackFromFavorites(id);
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
   * Add album to favorites by album id
   */
  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiCreatedResponse({
    description: 'The album was added to favorites',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Album with this id does not exist',
  })
  async addAlbumToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const result = await this.favoritesService.addAlbumToFavorites(id);
      return result;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Album with this id does not exist',
          StatusCodes.UNPROCESSABLE_ENTITY,
        );
      }
      throw e;
    }
  }

  /**
   * Delete album from favorites by album id
   */
  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiNoContentResponse({
    description: 'The album has been deleted from favorites',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album with this id does not exist' })
  async deleteAlbumFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const album = await this.favoritesService.deleteAlbumFromFavorites(id);
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
   * Add artist to favorites by artist id
   */
  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiCreatedResponse({
    description: 'The artist was added to favorites',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Artist with this id does not exist',
  })
  async addArtistToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const result = await this.favoritesService.addArtistToFavorites(id);
      return result;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Artist with this id does not exist',
          StatusCodes.UNPROCESSABLE_ENTITY,
        );
      }
      throw e;
    }
  }

  /**
   * Delete artist from favorites by artist id
   */
  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiNoContentResponse({
    description: 'The artist has been deleted from favorites',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist with this id does not exist' })
  async deleteArtistFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const artist = await this.favoritesService.deleteArtistFromFavorites(id);
      return artist;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Artist with this id does not exist',
          StatusCodes.NOT_FOUND,
        );
      }
      throw e;
    }
  }
}
