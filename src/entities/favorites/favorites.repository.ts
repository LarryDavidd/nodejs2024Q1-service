import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/entities/prisma/prisma.service';

@Injectable()
export class FavoritesRepository {
  private id = '1';
  constructor(private readonly prisma: PrismaService) {}

  private async createFavorites() {
    await this.prisma.favorites.create({
      data: {
        id: this.id,
        artists: {
          connect: [],
        },
        albums: {
          connect: [],
        },
        tracks: {
          connect: [],
        },
      },
    });
  }

  async getFavorites() {
    await this.checkFavoritesExist();

    const favorites = await this.prisma.favorites.findUnique({
      where: { id: this.id },
      include: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
    return {
      artists: favorites.artists.map(({ favoritesId, ...artist }) => artist),
      albums: favorites.albums.map(({ favoritesId, ...album }) => album),
      tracks: favorites.tracks.map(({ favoritesId, ...track }) => track),
    };
  }

  async addTrackToFavorites(id: string) {
    await this.checkFavoritesExist();
    return await this.prisma.favorites.update({
      where: { id: this.id },
      data: {
        tracks: {
          connect: {
            id,
          },
        },
      },
    });
  }

  async addAlbumToFavorites(id: string) {
    await this.checkFavoritesExist();
    return await this.prisma.favorites.update({
      where: { id: this.id },
      data: {
        albums: {
          connect: {
            id,
          },
        },
      },
    });
  }

  async addArtistToFavorites(id: string) {
    await this.checkFavoritesExist();
    return await this.prisma.favorites.update({
      where: { id: this.id },
      data: {
        artists: {
          connect: {
            id,
          },
        },
      },
    });
  }

  async deleteTrackFromFavorites(id: string) {
    await this.checkFavoritesExist();
    return this.prisma.favorites.update({
      where: { id: this.id },
      data: {
        tracks: {
          disconnect: {
            id,
          },
        },
      },
    });
  }

  async deleteAlbumFromFavorites(id: string) {
    await this.checkFavoritesExist();
    return this.prisma.favorites.update({
      where: { id: this.id },
      data: {
        albums: {
          disconnect: {
            id,
          },
        },
      },
    });
  }

  async deleteArtistFromFavorites(id: string) {
    await this.checkFavoritesExist();
    return this.prisma.favorites.update({
      where: { id: this.id },
      data: {
        artists: {
          disconnect: {
            id,
          },
        },
      },
    });
  }

  async getFavoritesAlbums() {
    await this.checkFavoritesExist();
    const { albums } = await this.prisma.favorites.findUnique({
      where: { id: this.id },
      include: {
        albums: true,
      },
    });
    return albums;
  }

  async getFavoritesArtists() {
    await this.checkFavoritesExist();
    const { artists } = await this.prisma.favorites.findUnique({
      where: { id: this.id },
      include: {
        artists: true,
      },
    });
    return artists;
  }

  async getFavoritesTracks() {
    await this.checkFavoritesExist();
    const { tracks } = await this.prisma.favorites.findUnique({
      where: { id: this.id },
      include: {
        tracks: true,
      },
    });
    return tracks;
  }

  getArtists() {
    return this.prisma.artist.findMany();
  }

  getAlbums() {
    return this.prisma.album.findMany();
  }

  getTracks() {
    return this.prisma.track.findMany();
  }

  private async checkFavoritesExist() {
    const favorites = await this.prisma.favorites.findUnique({
      where: { id: this.id },
    });
    if (!favorites) await this.createFavorites();
  }
}
