import {
  IsArray,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class addCreatorDTO {
  @IsString()
  @MinLength(1, {
    message: 'Name is too short',
  })
  name: string;

  @IsString()
  @MinLength(1, {
    message: 'Description is too short',
  })
  description: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  @MaxLength(3, {
    each: true,
  })
  tags: string[];

  @IsOptional()
  @IsArray()
  socials: object[];

  @IsOptional()
  @IsString()
  photo: string;

  @IsOptional()
  @IsDate()
  createAt: Date;
}
