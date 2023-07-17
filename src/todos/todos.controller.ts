import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Todo } from '@prisma/client';

import { TodosService } from './todos.service';
import { CreateTodoDto, EditTodoDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get('/:todoId')
  getTodoById(@Param('todoId', ParseIntPipe) todoId: number): Promise<Todo> {
    return this.todosService.getTodoById(todoId);
  }

  @Post('/create')
  createTodo(@Body() dto: CreateTodoDto): Promise<Todo> {
    return this.todosService.createTodo(dto);
  }

  @Post('/edit')
  editTodo(@Body() dto: EditTodoDto): Promise<Todo> {
    return this.todosService.editTodo(dto);
  }

  @Delete('/:todoId')
  removeTodo(@Param('todoId', ParseIntPipe) todoId: number): Promise<Todo> {
    return this.todosService.removeTodo(todoId);
  }
}
