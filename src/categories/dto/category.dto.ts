import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsInt()
  progress: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}

export class EditCategoryDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsInt()
  progress: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsDate()
  createdAt?: Date;

  @IsDate()
  updatedAt?: Date;
}
