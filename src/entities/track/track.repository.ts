import { v4 as uuid } from 'uuid';
import { CreateArtistDto } from './dto/create-track.dto';
import { UpdateArtistDto } from './dto/update-track.dto';
import { Injectable } from '@nestjs/common';
import { StoreService } from '@/store/artist/store.service';

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

@Injectable()
export class ArtistRepository {
  constructor(private readonly storeService: StoreService) {}

  getArtists(): Artist[] {
    return this.storeService.getArtists();
  }

  getArtist(id: string): Artist {
    return this.storeService.getArtist(id);
  }

  createArtist(artistData: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuid(),
      name: artistData.name,
      grammy: artistData.grammy,
    };
    this.storeService.createArtist(newArtist);
    return newArtist;
  }

  updateArtistInfo(id: string, artistData: UpdateArtistDto): Artist {
    const artist: Artist = {
      id,
      name: artistData.name,
      grammy: artistData.grammy,
    };
    this.storeService.updateArtist(artist);
    return artist;
  }

  deleteArtist(id: string): boolean {
    return this.storeService.deleteArtist(id);
  }
}
