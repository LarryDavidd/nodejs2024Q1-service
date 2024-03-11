import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesRepository } from './favorites.repository';
import { FavoritesController } from './favorites.controller';
import { StoreModule } from '@/store/favorites/store.module';

@Module({
  providers: [FavoritesService, FavoritesRepository],
  controllers: [FavoritesController],
  imports: [StoreModule],
})
export class FavoritesModule {}
