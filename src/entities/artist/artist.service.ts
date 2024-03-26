import { BadRequestException, Injectable } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async getArtists() {
    return await this.artistRepository.getArtists();
  }

  async getArtist(id: string) {
    this.isValidId(id);
    return this.getArtistIfExist(id);
  }

  async createArtist(artistData: CreateArtistDto) {
    return await this.artistRepository.createArtist(artistData);
  }

  async updateArtist(id: string, artistData: UpdateArtistDto) {
    this.isValidId(id);
    await this.getArtistIfExist(id);

    return this.artistRepository.updateArtistInfo(id, artistData);
  }

  async deleteArtist(id: string) {
    this.isValidId(id);
    this.getArtistIfExist(id);

    return this.artistRepository.deleteArtist(id);
  }

  private async getArtistIfExist(id: string) {
    const artist = await this.artistRepository.getArtist(id);
    return artist;
  }

  private isValidId = (id: string) => {
    if (!isUUID(id)) throw new BadRequestException(`Invalid id ${id}`);
  };
}
