import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import isValidId from '@/utils/isValidId';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async getAlbums() {
    return await this.albumRepository.getAlbums();
  }

  async getAlbum(id: string) {
    isValidId(id);
    const album = await this.albumRepository.getAlbum(id);

    return album;
  }

  async createAlbum(albumData: CreateAlbumDto) {
    return await this.albumRepository.createAlbum(albumData);
  }

  async updateAlbum(id: string, albumData: UpdateAlbumDto) {
    isValidId(id);
    await this.getAlbumIfExist(id);

    return this.albumRepository.updateAlbum(id, albumData);
  }

  async deleteAlbum(id: string) {
    isValidId(id);
    await this.getAlbumIfExist(id);

    return this.albumRepository.deleteAlbum(id);
  }

  private async getAlbumIfExist(id: string) {
    const album = await this.albumRepository.getAlbum(id);
    if (!album) throw new NotFoundException(`Album ${id} not found`);
    return album;
  }
}
