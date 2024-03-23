import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import isValidId from '@/utils/isValidId';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async getArtists() {
    return await this.artistRepository.getArtists();
  }

  async getArtist(id: string) {
    isValidId(id);
    return this.getArtistIfExist(id);
  }

  async createArtist(artistData: CreateArtistDto) {
    return await this.artistRepository.createArtist(artistData);
  }

  async updateArtist(id: string, artistData: UpdateArtistDto) {
    isValidId(id);
    await this.getArtistIfExist(id);

    return this.artistRepository.updateArtistInfo(id, artistData);
  }

  async deleteArtist(id: string) {
    isValidId(id);
    this.getArtistIfExist(id);

    return this.artistRepository.deleteArtist(id);
  }

  private async getArtistIfExist(id: string) {
    const artist = await this.artistRepository.getArtist(id);
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }
}
