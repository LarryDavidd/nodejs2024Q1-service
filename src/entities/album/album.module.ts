import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumRepository } from './album.repository';
import { StoreModule } from '@/store/album/store.module';
import { PrismaModule } from '@/entities/prisma/prisma.module';

@Module({
  providers: [AlbumRepository, AlbumService],
  controllers: [AlbumController],
  imports: [StoreModule, PrismaModule],
})
export class AlbumModule {}
