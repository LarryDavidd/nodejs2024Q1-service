import { v4 as uuid } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Injectable } from '@nestjs/common';
import { StoreService } from '@/store/track/store.service';
import { Track } from '@/utils/types';

@Injectable()
export class TrackRepository {
  constructor(private readonly storeService: StoreService) {}

  getTracks(): Track[] {
    return this.storeService.getTracks();
  }

  getTrack(id: string): Track {
    return this.storeService.getTrack(id);
  }

  createTrack(trackData: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuid(),
      name: trackData.name,
      artistId: trackData.artistId,
      albumId: trackData.albumId,
      duration: trackData.duration,
    };
    this.storeService.createTrack(newTrack);
    return newTrack;
  }

  updateTrackInfo(id: string, trackData: UpdateTrackDto): Track {
    const track: Track = {
      id,
      name: trackData.name,
      artistId: trackData.artistId,
      albumId: trackData.albumId,
      duration: trackData.duration,
    };
    this.storeService.updateTrack(track);
    return track;
  }

  deleteTrack(id: string): boolean {
    return this.storeService.deleteTrack(id);
  }
}
