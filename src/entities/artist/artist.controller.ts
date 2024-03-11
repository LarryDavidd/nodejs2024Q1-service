import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAll() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.artistService.getArtist(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateArtistDto) {
    return this.artistService.createArtist(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: CreateArtistDto) {
    return this.artistService.updateArtist(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
