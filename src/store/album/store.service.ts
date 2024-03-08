import { UpdateAlbumDto } from '@/entities/album/dto/update-album.dto';
import { Album } from '@/utils/types';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StoreService {
  private store: Album[] = null;

  constructor() {
    this.store = [];
  }

  getAlbums() {
    return this.store;
  }

  getAlbum(id: string) {
    const album = this.store.find((album) => album.id === id);
    if (!album) throw new NotFoundException('album not found');
    return album;
  }

  createAlbum(album: Album) {
    return this.store.push(album);
  }

  updateAlbum(id: string, albumData: UpdateAlbumDto): Album {
    const album = this.store.find((album) => album.id === id);
    if (album) {
      album.name = albumData.name;
      album.year = albumData.year;
      album.artistId = albumData.artistId;
    }
    return album;
  }

  deleteAlbum(id: string) {
    const index = this.store.findIndex((album) => album.id === id);
    if (index !== -1) {
      this.store.splice(index, 1);
      return true;
    }
    return false;
  }
}
