/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Test, TestingModule } from '@nestjs/testing';
import { ArtworkEntity } from '../artwork/artwork.entity';
import { Repository } from 'typeorm';
import { MuseumEntity } from '../museum/museum.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { MuseumArtworkService } from './museum-artwork.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as faker from 'faker'; 

describe('MuseumArtworkService', () => {
  let service: MuseumArtworkService;
  let museumRepository: Repository<MuseumEntity>;
  let artworkRepository: Repository<ArtworkEntity>;
  let museum: MuseumEntity;
  let artworksList: ArtworkEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [MuseumArtworkService],
    }).compile();

    service = module.get<MuseumArtworkService>(MuseumArtworkService);
    museumRepository = module.get<Repository<MuseumEntity>>(
      getRepositoryToken(MuseumEntity),
    );
    artworkRepository = module.get<Repository<ArtworkEntity>>(
      getRepositoryToken(ArtworkEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await artworkRepository.clear();
    await museumRepository.clear();

    artworksList = [];

    for (let i = 0; i < 5; i++) {
      const artwork: ArtworkEntity = await artworkRepository.save({
        name: faker.company.companyName(),
        year: faker.datatype.number(),
        description: faker.lorem.sentence(),
        type: 'Painting',
        mainImage: faker.internet.url(),
      });
      artworksList.push(artwork);
    }

    museum = await museumRepository.save({
      name: faker.company.companyName(),
      description: faker.lorem.sentence(),
      address: faker.address.secondaryAddress(),
      city: faker.address.city(),
      image: faker.internet.url(),
      artworks: artworksList,
    });
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addArtworkMuseum should add an artwork to a museum', async () => {
    const newArtwork = await artworkRepository.save({
      name: faker.company.companyName(),
      year: faker.datatype.number(),
      description: faker.lorem.sentence(),
      type: 'Painting',
      mainImage: faker.internet.url(),
    });

    const newMuseum = await museumRepository.save({
      name: faker.company.companyName(),
      description: faker.lorem.sentence(),
      address: faker.address.secondaryAddress(),
      city: faker.address.city(),
      image: faker.internet.url(),
    });

    const result = await service.addArtworkMuseum(
      newMuseum.id,
      newArtwork.id,
    );

    expect(result.artworks.length).toBe(1);
    expect(result.artworks[0].name).toBe(newArtwork.name);
  });

  it('deleteArtworkToMuseum should remove an artwork from a museum', async () => {
    const artwork = artworksList[0];

    await service.deleteArtworkMuseum(museum.id, artwork.id);

    const storedMuseum = await museumRepository.findOne({
      where: { id: museum.id },
      relations: ['artworks'],
    });

    expect(storedMuseum).not.toBeNull();

    const deletedArtwork = storedMuseum!.artworks.find(
      (a) => a.id === artwork.id,
    );

    expect(deletedArtwork).toBeUndefined();
  });
});