import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesRepository } from './favorites.repository';
import { FavoritesController } from './favorites.controller';
import { StoreModule } from '@/store/favorites/store.module';
import { PrismaModule } from '@/entities/prisma/prisma.module';

@Module({
  providers: [FavoritesService, FavoritesRepository],
  controllers: [FavoritesController],
  imports: [StoreModule, PrismaModule],
})
export class FavoritesModule {}
