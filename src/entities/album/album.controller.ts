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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAll() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.albumService.getAlbum(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateAlbumDto) {
    return this.albumService.createAlbum(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateAlbumDto) {
    return this.albumService.updateAlbum(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
