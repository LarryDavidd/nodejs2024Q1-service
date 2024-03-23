import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/entities/prisma/prisma.service';

@Injectable()
export class AlbumRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAlbums() {
    return await this.prisma.album.findMany();
  }

  async getAlbum(id: string) {
    return await this.prisma.album.findUnique({ where: { id } });
  }

  async createAlbum(albumData: CreateAlbumDto) {
    return await this.prisma.album.create({ data: albumData });
  }

  async updateAlbum(id: string, albumData: UpdateAlbumDto) {
    return await this.prisma.album.update({ where: { id }, data: albumData });
  }

  async deleteAlbum(id: string) {
    return await this.prisma.album.delete({ where: { id } });
  }
}
