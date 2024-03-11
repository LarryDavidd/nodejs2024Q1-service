import { Injectable } from '@nestjs/common';
import { StoreService } from '@/store/favorites/store.service';
import {
  Album,
  Artist,
  Favorites,
  FavoritesResponse,
  Track,
} from '@/utils/types';

@Injectable()
export class FavoritesRepository {
  private readonly favorites: Favorites = null;
  constructor(private readonly storeService: StoreService) {}

  getFavorites(): FavoritesResponse {
    return this.storeService.getFavorites();
  }

  getArtist(id: string): Artist {
    return this.storeService.getArtist(id);
  }

  getAlbum(id: string): Album {
    return this.storeService.getAlbum(id);
  }

  getTrack(id: string): Track {
    return this.storeService.getTrack(id);
  }

  addTrackToFavorites(id: string) {
    this.storeService.addTrackToFavorites(id);
  }

  addAlbumToFavorites(id: string) {
    this.storeService.addAlbumToFavorites(id);
  }

  addArtistToFavorites(id: string) {
    this.storeService.addArtistToFavorites(id);
  }

  deleteTrackFromFavorites(id: string) {
    this.storeService.deleteTrackFromFavorites(id);
  }

  deleteAlbumFromFavorites(id: string) {
    this.storeService.deleteAlbumFromFavorites(id);
  }

  deleteArtistFromFavorites(id: string) {
    this.storeService.deleteArtistFromFavorites(id);
  }
}
