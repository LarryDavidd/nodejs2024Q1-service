import { Injectable } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import isValidId from '@/utils/isValidId';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  getArtists() {
    return this.artistRepository.getArtists();
  }

  getArtist(id: string) {
    isValidId(id);
    const artist = this.artistRepository.getArtist(id);

    return artist;
  }

  createArtist(artistData: CreateArtistDto) {
    return this.artistRepository.createArtist(artistData);
  }

  updateArtist(id: string, artistData: UpdateArtistDto) {
    isValidId(id);

    return this.artistRepository.updateArtistInfo(id, artistData);
  }

  deleteArtist(id: string) {
    isValidId(id);

    return this.artistRepository.deleteArtist(id);
  }
}
