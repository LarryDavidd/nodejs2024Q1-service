import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';

export default [
  ConfigModule.forRoot(),
  UserModule,
  ArtistModule,
  AlbumModule,
  TrackModule,
  FavoritesModule,
];
