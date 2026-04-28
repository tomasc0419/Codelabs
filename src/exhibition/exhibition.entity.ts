/* eslint-disable prettier/prettier */
/* archivo: src/exhibition/exhibition.entity.ts */
import { ArtworkEntity } from "../artwork/artwork.entity";
import { MuseumEntity } from "../museum/museum.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SponsorEntity } from "../sponsor/sponsor.entity";

@Entity()
export class ExhibitionEntity {
   @PrimaryGeneratedColumn("uuid")
   id!: string;
   @Column()
   name!: string;
   @Column()
   description!: string;
   // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
   @ManyToOne(() => MuseumEntity, museum => museum.exhibitions)
   museum!: MuseumEntity;
   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   @OneToMany(() => ArtworkEntity, artwork => artwork.exhibition)
   artworks!: ArtworkEntity[];

   // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
   @OneToOne(() => SponsorEntity, sponsor => sponsor.exhibition)
   @JoinColumn()
   sponsor!: SponsorEntity;
}
/* archivo: src/exhibition/exhibition.entity.ts */