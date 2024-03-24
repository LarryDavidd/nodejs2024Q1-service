import { Injectable } from '@nestjs/common';
import {
  Album,
  Artist,
  Favorites,
  FavoritesResponse,
  Track,
} from '@/utils/types';
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
    const favorites = await this.prisma.favorites.findFirst({
      include: {
        tracks: true,
      },
    });
    return await favorites.update({
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
    const favorites = await this.prisma.favorites.findFirst({
      include: {
        albums: true,
      },
    });
    return await favorites.update({
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
    const favorites = await this.prisma.favorites.findFirst({
      include: {
        artists: true,
      },
    });
    return await favorites.update({
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
    const favorites = await this.prisma.favorites.findFirst({
      include: {
        tracks: true,
      },
    });
    return favorites.update({
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
    const favorites = await this.prisma.favorites.findFirst({
      include: {
        albums: true,
      },
    });
    return favorites.update({
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
    const favorites = await this.prisma.favorites.findFirst({
      include: {
        artists: true,
      },
    });
    return favorites.update({
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
