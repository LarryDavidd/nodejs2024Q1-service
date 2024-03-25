import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import isValidId from '@/utils/isValidId';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  findFavorites() {
    return this.favoritesRepository.getFavorites();
  }

  addArtistToFavorites(id: string) {
    isValidId(id);

    // const artist = this.favoritesRepository.getArtist(id);
    // if (!artist)
    //   throw new UnprocessableEntityException(`Artist with id ${id} not found`);

    this.favoritesRepository.addArtistToFavorites(id);
  }

  addAlbumToFavorites(id: string) {
    isValidId(id);

    // const album = this.favoritesRepository.getAlbum(id);
    // if (!album)
    //   throw new UnprocessableEntityException(`Album with id ${id} not found`);

    this.favoritesRepository.addAlbumToFavorites(id);
  }

  addTrackToFavorites(id: string) {
    isValidId(id);

    // const track = this.favoritesRepository.getTrack(id);
    // if (!track)
    //   throw new UnprocessableEntityException(`Track with id ${id} not found`);

    this.favoritesRepository.addTrackToFavorites(id);
  }

  deleteArtistFromFavorites(id: string) {
    isValidId(id);

    // const artist = this.favoritesRepository.getArtist(id);
    // if (!artist) throw new NotFoundException(`Artist with id ${id} not found`);

    this.favoritesRepository.deleteArtistFromFavorites(id);
  }

  deleteAlbumFromFavorites(id: string) {
    isValidId(id);

    // const album = this.favoritesRepository.getAlbum(id);
    // if (!album) throw new NotFoundException(`Album with id ${id} not found`);

    this.favoritesRepository.deleteAlbumFromFavorites(id);
  }

  deleteTrackFromFavorites(id: string) {
    isValidId(id);

    // const track = this.favoritesRepository.getTrack(id);
    // if (!track) throw new NotFoundException(`Track with id ${id} not found`);

    this.favoritesRepository.deleteTrackFromFavorites(id);
  }
}
