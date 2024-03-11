import { Injectable } from '@nestjs/common';
import { StoreService as AlbumStore } from '@/store/album/store.service';
import { StoreService as ArtistStore } from '@/store/artist/store.service';
import { StoreService as TrackStore } from '@/store/track/store.service';
import { Album, Artist, Favorites, Track } from '@/utils/types';

@Injectable()
export class StoreService {
  private store: Favorites = null;

  constructor(
    private readonly AlbumStore: AlbumStore,
    private readonly ArtistStore: ArtistStore,
    private readonly TrackStore: TrackStore,
  ) {
    this.store = {
      albums: [],
      artists: [],
      tracks: [],
    };
  }

  getFavorites() {
    return {
      albums: this.getFavoritesAlbums(),
      artists: this.getFavoritesArtists(),
      tracks: this.getFavoritesTracks(),
    };
  }

  getFavoritesAlbums(): Album[] {
    return this.AlbumStore.getAlbums().filter((album) =>
      this.store.albums.includes(album.id),
    );
  }

  getFavoritesArtists(): Artist[] {
    return this.ArtistStore.getArtists().filter((artist) =>
      this.store.artists.includes(artist.id),
    );
  }

  getFavoritesTracks(): Track[] {
    return this.TrackStore.getTracks().filter((track) =>
      this.store.tracks.includes(track.id),
    );
  }
  addAlbumToFavorites(id: string) {
    this.store.albums.push(id);
  }

  addTrackToFavorites(id: string) {
    this.store.tracks.push(id);
  }

  addArtistToFavorites(id: string) {
    this.store.artists.push(id);
  }

  deleteAlbumFromFavorites(id: string) {
    const index = this.store.albums.findIndex((albumId) => albumId === id);
    if (index !== -1) {
      this.store.albums.splice(index, 1);
    }
  }

  deleteTrackFromFavorites(id: string) {
    const index = this.store.tracks.findIndex((trackId) => trackId === id);
    if (index !== -1) {
      this.store.tracks.splice(index, 1);
    }
  }

  deleteArtistFromFavorites(id: string) {
    const index = this.store.artists.findIndex((artistId) => artistId === id);
    if (index !== -1) {
      this.store.artists.splice(index, 1);
    }
  }

  getAlbum(id: string) {
    return this.AlbumStore.getAlbum(id);
  }

  getArtist(id: string) {
    return this.ArtistStore.getArtist(id);
  }

  getTrack(id: string) {
    return this.TrackStore.getTrack(id);
  }
}
