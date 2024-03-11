import { v4 as uuid } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Injectable } from '@nestjs/common';
import { StoreService } from '@/store/album/store.service';
import { Album } from '@/utils/types';

@Injectable()
export class AlbumRepository {
  constructor(private readonly storeService: StoreService) {}

  getAlbums(): Album[] {
    return this.storeService.getAlbums();
  }

  getAlbum(id: string): Album {
    return this.storeService.getAlbum(id);
  }

  createAlbum(albumData: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuid(),
      name: albumData.name,
      artistId: albumData.artistId,
      year: albumData.year,
    };
    this.storeService.createAlbum(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, albumData: UpdateAlbumDto): Album {
    const Album: Album = {
      id,
      name: albumData.name,
      artistId: albumData.artistId,
      year: albumData.year,
    };
    this.storeService.updateAlbum(id, Album);
    return Album;
  }

  deleteAlbum(id: string): boolean {
    return this.storeService.deleteAlbum(id);
  }
}
