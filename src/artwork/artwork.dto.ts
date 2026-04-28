/* eslint-disable prettier/prettier */
 // eslint-disable-next @typescript-eslint/no-unsafe-call
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';

export class ArtworkDto {
   @IsString()
   @IsNotEmpty()
   readonly name!: string;

   @IsNumber()
   @IsNotEmpty()
   readonly year!: number;

   @IsString()
   @IsNotEmpty()
   readonly description!: string;

   @IsString()
   @IsNotEmpty()
   readonly type!: string;

   @IsUrl()
   @IsNotEmpty()
   readonly mainImage!: string;
}
/* archivo : src/artwork/artwork.dto.ts*/