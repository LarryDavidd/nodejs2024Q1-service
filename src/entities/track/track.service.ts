import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  async getTracks() {
    return await this.trackRepository.getTracks();
  }

  async getTrack(id: string) {
    this.isValidId(id);
    const track = await this.getTrackIfExist(id);

    return track;
  }

  async createTrack(trackData: CreateTrackDto) {
    return await this.trackRepository.createTrack(trackData);
  }

  async updateTrack(id: string, trackData: UpdateTrackDto) {
    this.isValidId(id);
    this.getTrackIfExist(id);

    return this.trackRepository.updateTrackInfo(id, trackData);
  }

  async deleteTrack(id: string) {
    this.isValidId(id);
    await this.getTrackIfExist(id);

    return this.trackRepository.deleteTrack(id);
  }

  private async getTrackIfExist(id: string) {
    const track = await this.trackRepository.getTrack(id);
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);
    return track;
  }

  private isValidId = (id: string) => {
    if (!isUUID(id)) throw new BadRequestException(`Invalid id ${id}`);
  };
}
