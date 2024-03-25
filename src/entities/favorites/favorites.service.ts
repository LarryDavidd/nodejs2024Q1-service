import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { isUUID } from 'class-validator';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  getFavorites() {
    return this.favoritesRepository.getFavorites();
  }

  async addArtistToFavorites(id: string) {
    this.isValidId(id);

    const artist = (await this.favoritesRepository.getArtists()).find(
      (artist) => artist.id === id,
    );
    if (!artist)
      throw new UnprocessableEntityException(`Artist with id ${id} not found`);

    return await this.favoritesRepository.addArtistToFavorites(id);
  }

  async addAlbumToFavorites(id: string) {
    this.isValidId(id);

    const album = (await this.favoritesRepository.getAlbums()).find(
      (album) => album.id === id,
    );
    if (!album)
      throw new UnprocessableEntityException(`Album with id ${id} not found`);

    return await this.favoritesRepository.addAlbumToFavorites(id);
  }

  async addTrackToFavorites(id: string) {
    this.isValidId(id);

    const track = (await this.favoritesRepository.getTracks()).find(
      (track) => track.id === id,
    );
    if (!track)
      throw new UnprocessableEntityException(`Track with id ${id} not found`);

    return await this.favoritesRepository.addTrackToFavorites(id);
  }

  async deleteArtistFromFavorites(id: string) {
    this.isValidId(id);

    const artist = (await this.favoritesRepository.getFavoritesArtists()).find(
      (artist) => artist.id === id,
    );
    if (!artist) throw new NotFoundException(`Artist with id ${id} not found`);

    return await this.favoritesRepository.deleteArtistFromFavorites(id);
  }

  async deleteAlbumFromFavorites(id: string) {
    this.isValidId(id);

    const album = (await this.favoritesRepository.getFavoritesAlbums()).find(
      (album) => album.id === id,
    );
    if (!album) throw new NotFoundException(`Album with id ${id} not found`);

    return await this.favoritesRepository.deleteAlbumFromFavorites(id);
  }

  async deleteTrackFromFavorites(id: string) {
    this.isValidId(id);

    const track = (await this.favoritesRepository.getFavoritesTracks()).find(
      (track) => track.id === id,
    );
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);

    return await this.favoritesRepository.deleteTrackFromFavorites(id);
  }

  private isValidId = (id: string) => {
    if (!isUUID(id)) throw new BadRequestException(`Invalid id ${id}`);
  };
}
