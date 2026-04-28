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
        foundedBefore: faker.datatype.number(),
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

  it('debe ser definido', () => {
    expect(service).toBeDefined();
  });

  it('findAll debe retornar todos los museos', async () => {
    const museums = await service.findAll({});
    expect(museums).not.toBeNull();
    expect(museums).toHaveLength(museumsList.length);
  });

  it('findOne debe retornar un museo por id', async () => {
    const storedMuseum = museumsList[0];
    const museum = await service.findOne(storedMuseum.id);

    expect(museum).not.toBeNull();
    expect(museum.name).toEqual(storedMuseum.name);
  });

  it('findOne debe lanzar una excepción para un museo inválido', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'el museo con el id dado no fue encontrado',
    );
  });

  it('create debe retornar un nuevo museo', async () => {
    const museum: Partial<MuseumEntity> = {
      name: faker.company.companyName(),
      description: faker.lorem.sentence(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      image: faker.internet.url(),
      foundedBefore: faker.datatype.number(),
      exhibitions: [],
      artworks: [],
    };

    const newMuseum = await service.create(museum as MuseumEntity);
    expect(newMuseum).not.toBeNull();
  });

  it('update debe modificar un museo', async () => {
    const museum = museumsList[0];
    museum.name = 'New name';

    const updated = await service.update(museum.id, museum);
    expect(updated.name).toEqual('New name');
  });

  it('delete debe eliminar un museo', async () => {
    const museum = museumsList[0];
    await service.delete(museum.id);

    const deleted = await repository.findOne({
      where: { id: museum.id },
    });

    expect(deleted).toBeNull();
  });
  //filtro nombre
  it('debe filtrar museos por nombre', async () => {
  museumsList[0].name = 'Museo Oro';
  await repository.save(museumsList[0]);

  const result = await service.findAll({ name: 'oro' });

  expect(result.length).toBeGreaterThan(0);
  result.forEach(m => {
    expect(m.name.toLowerCase()).toContain('oro');
  });
});
//filtro ciudad
it('debe filtrar museos por ciudad', async () => {
  museumsList[0].city = 'Bogota';
  await repository.save(museumsList[0]);

  const result = await service.findAll({ city: 'bogota' });

  expect(result.length).toBeGreaterThan(0);
  result.forEach(m => {
    expect(m.city.toLowerCase()).toContain('bogota');
  });
});
//filtro fundados antes de un año
it('debe filtrar museos por fundados antes de un año', async () => {
  museumsList[0].foundedBefore = 1800;
  museumsList[1].foundedBefore = 2000;

  await repository.save(museumsList);

  const result = await service.findAll({ foundedBefore: '1900' });

  result.forEach(m => {
    expect(m.foundedBefore).toBeLessThan(1900);
  });
});
//filtro paginación
it('debe paginar los museos', async () => {
  const result = await service.findAll({ page: '1', limit: '2' });

  expect(result.length).toBeLessThanOrEqual(2);
});
//combinacion de filtros
it('debe filtrar por nombre y ciudad', async () => {
  museumsList[0].name = 'Arte Moderno';
  museumsList[0].city = 'Bogota';

  await repository.save(museumsList[0]);

  const result = await service.findAll({
    name: 'arte',
    city: 'bogota',
  });

  result.forEach(m => {
    expect(m.name.toLowerCase()).toContain('arte');
    expect(m.city.toLowerCase()).toContain('bogota');
  });
});
it('debe retornar todos los museos cuando no se proporcionan filtros', async () => {
  const result = await service.findAll({});

  expect(result.length).toBeGreaterThan(0);
});
});