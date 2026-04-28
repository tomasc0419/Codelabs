/* eslint-disable prettier/prettier */
/* archivo: src/sponsor/sponsor.entity.ts */
import { ExhibitionEntity } from "../exhibition/exhibition.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SponsorEntity {
   @PrimaryGeneratedColumn("uuid")
   id!: string;
   @Column()
   name!: string;
   @Column()
   description!: string;
   @Column()
   website!: string;

   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   @OneToOne(() => ExhibitionEntity, exhibition => exhibition.sponsor)
   exhibition!: ExhibitionEntity;

}
/* archivo: src/sponsor/sponsor.entity.ts */
