import { Injectable } from '@nestjs/common';

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

@Injectable()
export class StoreService {
  private store: Artist[] = null;

  constructor() {
    this.store = [];
  }

  getArtists() {
    return this.store;
  }

  getArtist(id: string) {
    return this.store.find((artist) => artist.id === id);
  }

  createArtist(artist: Artist) {
    return this.store.push(artist);
  }

  updateArtist({ id, name, grammy }: Artist): Artist {
    const artist = this.store.find((artist) => artist.id === id);

    artist.name = name;
    artist.grammy = grammy;

    return artist;
  }

  deleteArtist(id: string) {
    const index = this.store.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.store.splice(index, 1);
      return true;
    }
    return false;
  }
}
