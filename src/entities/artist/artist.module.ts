import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistRepository } from './artist.repository';
import { StoreModule } from '@/store/artist/store.module';
import { PrismaModule } from '@/entities/prisma/prisma.module';

@Module({
  providers: [ArtistRepository, ArtistService],
  controllers: [ArtistController],
  imports: [StoreModule, PrismaModule],
})
export class ArtistModule {}
