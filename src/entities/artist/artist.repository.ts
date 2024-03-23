import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/entities/prisma/prisma.service';

@Injectable()
export class ArtistRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getArtists() {
    return await this.prisma.artist.findMany();
  }

  async getArtist(id: string) {
    return await this.prisma.artist.findUnique({ where: { id } });
  }

  async createArtist(artistData: CreateArtistDto) {
    return await this.prisma.artist.create({ data: artistData });
  }

  async updateArtistInfo(id: string, artistData: UpdateArtistDto) {
    return await this.prisma.artist.update({ where: { id }, data: artistData });
  }

  async deleteArtist(id: string) {
    return await this.prisma.artist.delete({ where: { id } });
  }
}
