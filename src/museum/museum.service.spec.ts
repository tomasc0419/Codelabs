/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { MuseumEntity } from './museum.entity';
import { MuseumService } from './museum.service';
import * as faker from 'faker';

describe('MuseumService', () => {
  let service: MuseumService;
  let repository: Repository<MuseumEntity>;
  let museumsList: MuseumEntity[] = [];

  const seedDatabase = async (): Promise<void> => {
    await repository.clear();
    museumsList = [];

    for (let i = 0; i < 5; i++) {
      const museum = await repository.save({
        name: faker.company.companyName(),
        description: faker.lorem.sentence(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        image: faker.internet.url(),
        exhibitions: [],
        artworks: [],
      });

      museumsList.push(museum);
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [MuseumService],
    }).compile();

    service = module.get<MuseumService>(MuseumService);
    repository = module.get<Repository<MuseumEntity>>(
      getRepositoryToken(MuseumEntity),
    );

    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all museums', async () => {
    const museums = await service.findAll();
    expect(museums).not.toBeNull();
    expect(museums).toHaveLength(museumsList.length);
  });

  it('findOne should return a museum by id', async () => {
    const storedMuseum = museumsList[0];
    const museum = await service.findOne(storedMuseum.id);

    expect(museum).not.toBeNull();
    expect(museum.name).toEqual(storedMuseum.name);
  });

  it('findOne should throw an exception for an invalid museum', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The museum with the given id was not found',
    );
  });

  it('create should return a new museum', async () => {
    const museum: Partial<MuseumEntity> = {
      name: faker.company.companyName(),
      description: faker.lorem.sentence(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      image: faker.internet.url(),
      exhibitions: [],
      artworks: [],
    };

    const newMuseum = await service.create(museum as MuseumEntity);
    expect(newMuseum).not.toBeNull();
  });

  it('update should modify a museum', async () => {
    const museum = museumsList[0];
    museum.name = 'New name';

    const updated = await service.update(museum.id, museum);
    expect(updated.name).toEqual('New name');
  });

  it('delete should remove a museum', async () => {
    const museum = museumsList[0];
    await service.delete(museum.id);

    const deleted = await repository.findOne({
      where: { id: museum.id },
    });

    expect(deleted).toBeNull();
  });
});