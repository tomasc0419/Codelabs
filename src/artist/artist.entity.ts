/* eslint-disable prettier/prettier */
/* archivo: src/artist/artist.entity.ts */
import { ArtworkEntity } from "../artwork/artwork.entity";
import { MovementEntity } from "../movement/movement.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ArtistEntity {
   @PrimaryGeneratedColumn("uuid")
   id!: string;
   @Column()
   name!: string;
   @Column()
   birthplace!: string;
   @Column()
   birthdate!: Date;
   @Column()
   image!: string;

   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   @OneToMany(() => ArtworkEntity, artwork => artwork.artist)
   artworks!: ArtworkEntity[];

   // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
   @ManyToMany(() => MovementEntity, movement => movement.artists)
   movements!: MovementEntity[];

}
/* archivo: src/artist/artist.entity.ts */