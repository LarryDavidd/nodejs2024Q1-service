import { Injectable } from '@nestjs/common';
import { Album, Artist, Favorites, Track } from '@/utils/types';
import { PrismaService } from '@/entities/prisma/prisma.service';

@Injectable()
export class FavoritesRepository {
  private readonly favorites: Favorites = null;
  constructor(private readonly prisma: PrismaService) {}

  async getFavorites() {
    const favorites = await this.prisma.favorites.findFirst({
      include: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
    return {
      artists: favorites.artists.map((artist: Artist) => artist),
      albums: favorites.albums.map((album: Album) => album),
      tracks: favorites.tracks.map((track: Track) => track),
    };
  }

  async addTrackToFavorites(id: string) {
    return await this.prisma.favorites.update({
      where: { id: '1' },
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
    return await this.prisma.favorites.update({
      where: { id: '1' },
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
    return await this.prisma.favorites.update({
      where: { id: '1' },
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
    return this.prisma.favorites.update({
      where: { id: '1' },
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
    return this.prisma.favorites.update({
      where: { id: '1' },
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
    return this.prisma.favorites.update({
      where: { id: '1' },
      data: {
        artists: {
          disconnect: {
            id,
          },
        },
      },
    });
  }
}
