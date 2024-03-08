import { Injectable } from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import isValidId from '@/utils/isValidId';
import { Album } from '@/utils/types';

// interface Album {
//   id: string; // uuid v4
//   name: string;
//   year: number;
//   artistId: string | null; // refers to Artist
// }
@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  getAlbums(): Album[] {
    return this.albumRepository.getAlbums();
  }

  getAlbum(id: string): Album {
    isValidId(id);
    const album = this.albumRepository.getAlbum(id);

    return album;
  }

  createAlbum(albumData: CreateAlbumDto): Album {
    return this.albumRepository.createAlbum(albumData);
  }

  updateAlbum(id: string, albumData: UpdateAlbumDto): Album {
    isValidId(id);

    return this.albumRepository.updateAlbum(id, albumData);
  }

  deleteAlbum(id: string) {
    isValidId(id);

    return this.albumRepository.deleteAlbum(id);
  }
}
