/* eslint-disable prettier/prettier */
/* archivo: src/museum/museum.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { MuseumEntity } from './museum.entity';
import { MuseumQueryDto } from './museum-query.dto';

@Injectable()
export class MuseumService {
   constructor(
       @InjectRepository(MuseumEntity)
       private readonly museumRepository: Repository<MuseumEntity>
   ){}

    async findAll(query: MuseumQueryDto): Promise<MuseumEntity[]> {
    const { name, city, foundedBefore, page, limit } = query;

    const qb = this.museumRepository
        .createQueryBuilder('museum')
        .leftJoinAndSelect('museum.artworks', 'artworks')
        .leftJoinAndSelect('museum.exhibitions', 'exhibitions');

    
    if (name) {
        qb.andWhere('LOWER(museum.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
        });
    }

    if (city) {
        qb.andWhere('LOWER(museum.city) LIKE LOWER(:city)', {
        city: `%${city}%`,
        });
    }

    if (foundedBefore) {
        qb.andWhere('museum.foundedBefore < :year', {
        year: Number(foundedBefore),
        });
    }

    
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 10;

    qb.skip((pageNumber - 1) * limitNumber).take(limitNumber);

    return await qb.getMany();
    }

   async findOne(id: string): Promise<MuseumEntity> {
       const museum: MuseumEntity | null = await this.museumRepository.findOne({where: {id}, relations: ["artworks", "exhibitions"] } );
       if (!museum)         
         throw new BusinessLogicException("el museo con el id dado no fue encontrado", BusinessError.NOT_FOUND);
  
       return museum;
   }
  
   async create(museum: MuseumEntity): Promise<MuseumEntity> {
       return await this.museumRepository.save(museum);
   }

   async update(id: string, museum: MuseumEntity): Promise<MuseumEntity> {
       const persistedMuseum: MuseumEntity | null = await this.museumRepository.findOne({where:{id}});
       if (!persistedMuseum)
         throw new BusinessLogicException("el museo con el id dado no fue encontrado", BusinessError.NOT_FOUND);
      
       museum.id = id; 
      
       return await this.museumRepository.save(museum);
   }

   async delete(id: string) {
       const museum: MuseumEntity | null = await this.museumRepository.findOne({where:{id}});
       if (!museum)
         throw new BusinessLogicException("el museo con el id dado no fue encontrado", BusinessError.NOT_FOUND);
    
       await this.museumRepository.remove(museum);
   }
}
/* archivo: src/museum/museum.service.ts */
