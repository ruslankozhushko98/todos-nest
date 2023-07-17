import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsBoolean()
  isDone?: boolean;

  @IsInt()
  categoryId: number;
}

export class EditTodoDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsBoolean()
  isDone?: boolean;

  @IsInt()
  categoryId: number;
}
