import { Track } from '@/utils/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreService {
  private store: Track[] = null;

  constructor() {
    this.store = [];
  }

  getTracks() {
    return this.store;
  }

  getTrack(id: string) {
    return this.store.find((Track) => Track.id === id);
  }

  createTrack(Track: Track) {
    return this.store.push(Track);
  }

  updateTrack({ id, name, artistId, albumId, duration }: Track): Track {
    const track = this.store.find((Track) => Track.id === id);

    track.name = name;
    track.artistId = artistId;
    track.albumId = albumId;
    track.duration = duration;

    return track;
  }

  deleteTrack(id: string) {
    const index = this.store.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.store.splice(index, 1);
      return true;
    }
    return false;
  }
}
