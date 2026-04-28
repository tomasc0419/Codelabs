import { Module } from '@nestjs/common';
import { MuseumArtworkService } from './museum-artwork.service';
import { MuseumArtworkController } from './museum-artwork.controller';

@Module({
  providers: [MuseumArtworkService],
  controllers: [MuseumArtworkController]
})
export class MuseumArtworkModule {}
