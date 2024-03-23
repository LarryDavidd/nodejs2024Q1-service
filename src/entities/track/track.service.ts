import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import isValidId from '@/utils/isValidId';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  async getTracks() {
    return await this.trackRepository.getTracks();
  }

  async getTrack(id: string) {
    isValidId(id);
    const track = await this.getTrackIfExist(id);

    return track;
  }

  async createTrack(trackData: CreateTrackDto) {
    return await this.trackRepository.createTrack(trackData);
  }

  async updateTrack(id: string, trackData: UpdateTrackDto) {
    isValidId(id);
    this.getTrackIfExist(id);

    return this.trackRepository.updateTrackInfo(id, trackData);
  }

  async deleteTrack(id: string) {
    isValidId(id);
    await this.getTrackIfExist(id);

    return this.trackRepository.deleteTrack(id);
  }

  private async getTrackIfExist(id: string) {
    const track = await this.trackRepository.getTrack(id);
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);
    return track;
  }
}
