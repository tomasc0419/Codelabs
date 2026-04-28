/* eslint-disable prettier/prettier */
 // eslint-disable-next @typescript-eslint/no-unsafe-call
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class MuseumDto {

 @IsString()
 @IsNotEmpty()
 readonly name!: string;
 
 @IsString()
 @IsNotEmpty()
 readonly description!: string;
 
 @IsString()
 @IsNotEmpty()
 readonly address!: string;
 
 @IsString()
 @IsNotEmpty()
 readonly city!: string;
 
 @IsUrl()
 @IsNotEmpty()
 readonly image!: string;
}
/* archivo: src/museum/museum.dto.ts */