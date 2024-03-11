import { Injectable } from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import isValidId from '@/utils/isValidId';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  getTracks() {
    return this.trackRepository.getTracks();
  }

  getTrack(id: string) {
    isValidId(id);
    const track = this.trackRepository.getTrack(id);

    return track;
  }

  createTrack(trackData: CreateTrackDto) {
    return this.trackRepository.createTrack(trackData);
  }

  updateTrack(id: string, trackData: UpdateTrackDto) {
    isValidId(id);

    return this.trackRepository.updateTrackInfo(id, trackData);
  }

  deleteTrack(id: string) {
    isValidId(id);

    return this.trackRepository.deleteTrack(id);
  }
}
