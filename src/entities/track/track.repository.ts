import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/entities/prisma/prisma.service';

@Injectable()
export class TrackRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTracks() {
    return await this.prisma.track.findMany();
  }

  async getTrack(id: string) {
    return await this.prisma.track.findUnique({ where: { id } });
  }

  async createTrack(trackData: CreateTrackDto) {
    return await this.prisma.track.create({ data: trackData });
  }

  async updateTrackInfo(id: string, trackData: UpdateTrackDto) {
    return await this.prisma.track.update({ where: { id }, data: trackData });
  }

  async deleteTrack(id: string) {
    return await this.prisma.track.delete({ where: { id } });
  }
}
