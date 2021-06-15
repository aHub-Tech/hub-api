import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class Socials {
  // @ApiProperty() TODO: VERIFICAR PQ N ESTA FUNCIONANDO.
  [key: string]: string;
}

export class AddCreatorDTO {
  @ApiProperty({
    description: 'Name of Creator',
    minLength: 1,
  })
  @IsString()
  @MinLength(1, {
    message: 'Name is too short',
  })
  name: string;

  @ApiProperty({
    description: 'Description of Creator',
    minLength: 1,
  })
  @IsString()
  @MinLength(1, {
    message: 'Description is too short',
  })
  description: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiPropertyOptional({
    type: [String] ,
    maxLength: 3
  })
  @IsOptional()
  @IsArray()
  @MaxLength(3, {
    each: true,
  })
  tags: string[];

  @ApiPropertyOptional({ type: () => Socials })
  @IsOptional()
  socials: Socials[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  photo: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  createAt: Date;
}
