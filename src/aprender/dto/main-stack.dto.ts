import { IsArray, IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class Info {
    @IsString()
    quote: string;

    @IsString()
    author: string;
}

export class CreateMainStackDTO {
    @IsString()
    baseColor: string;

    @IsOptional()
    @IsString()
    source?: string;

    @IsOptional()
    @IsArray()
    title: string[];

    info: Info;
}
