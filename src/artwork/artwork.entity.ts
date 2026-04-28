/* eslint-disable prettier/prettier */
/* archivo: src/artwork/artwork.entity.ts */
import { ExhibitionEntity } from "../exhibition/exhibition.entity";
import { MuseumEntity } from "../museum/museum.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ImageEntity } from "../image/image.entity";
import { ArtistEntity } from "../artist/artist.entity";

@Entity()
export class ArtworkEntity {

   @PrimaryGeneratedColumn("uuid")
   id!: string;
   @Column()
   name!: string;
   @Column()
   year!: number;
   @Column()
   description!: string;
   @Column()
   type!: string;
   @Column()
   mainImage!: string;

   // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
   @ManyToOne(() => MuseumEntity, museum => museum.artworks)
   museum!: MuseumEntity;

   // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
   @ManyToOne(() => ExhibitionEntity, exhibition => exhibition.artworks)
   exhibition!: ExhibitionEntity;

   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   @OneToMany(() => ImageEntity, image => image.artwork)
   images!: ImageEntity[];

   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   @ManyToOne(() => ArtistEntity, artist => artist.artworks)
   artist!: ArtistEntity;
}

/* archivo: src/artwork/artwork.entity.ts */
