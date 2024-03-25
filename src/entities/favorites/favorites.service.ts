import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import isValidId from '@/utils/isValidId';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  getFavorites() {
    return this.favoritesRepository.getFavorites();
  }

  async addArtistToFavorites(id: string) {
    isValidId(id);

    const artist = (await this.favoritesRepository.getArtists()).find(
      (artist) => artist.id === id,
    );
    if (!artist)
      throw new UnprocessableEntityException(`Artist with id ${id} not found`);

    return await this.favoritesRepository.addArtistToFavorites(id);
  }

  async addAlbumToFavorites(id: string) {
    isValidId(id);

    const album = (await this.favoritesRepository.getAlbums()).find(
      (album) => album.id === id,
    );
    if (!album)
      throw new UnprocessableEntityException(`Album with id ${id} not found`);

    return await this.favoritesRepository.addAlbumToFavorites(id);
  }

  async addTrackToFavorites(id: string) {
    isValidId(id);

    const track = (await this.favoritesRepository.getTracks()).find(
      (track) => track.id === id,
    );
    if (!track)
      throw new UnprocessableEntityException(`Track with id ${id} not found`);

    return await this.favoritesRepository.addTrackToFavorites(id);
  }

  async deleteArtistFromFavorites(id: string) {
    isValidId(id);

    const artist = (await this.favoritesRepository.getFavoritesArtists()).find(
      (artist) => artist.id === id,
    );
    if (!artist) throw new NotFoundException(`Artist with id ${id} not found`);

    return await this.favoritesRepository.deleteArtistFromFavorites(id);
  }

  async deleteAlbumFromFavorites(id: string) {
    isValidId(id);

    const album = (await this.favoritesRepository.getFavoritesAlbums()).find(
      (album) => album.id === id,
    );
    if (!album) throw new NotFoundException(`Album with id ${id} not found`);

    return await this.favoritesRepository.deleteAlbumFromFavorites(id);
  }

  async deleteTrackFromFavorites(id: string) {
    isValidId(id);

    const track = (await this.favoritesRepository.getFavoritesTracks()).find(
      (track) => track.id === id,
    );
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);

    return await this.favoritesRepository.deleteTrackFromFavorites(id);
  }
}
