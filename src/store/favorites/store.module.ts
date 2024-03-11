import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreService as AlbumStore } from '@/store/album/store.service';
import { StoreService as ArtistStore } from '@/store/artist/store.service';
import { StoreService as TrackStore } from '@/store/track/store.service';

@Module({
  providers: [StoreService, AlbumStore, ArtistStore, TrackStore],
  exports: [StoreService],
})
export class StoreModule {}
