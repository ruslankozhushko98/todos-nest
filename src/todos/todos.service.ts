import { Injectable, NotFoundException } from '@nestjs/common';

import { Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto, EditTodoDto } from './dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async getTodoById(todoId: number): Promise<Todo> {
    const data = await this.prisma.todo.findFirst({
      where: {
        id: todoId,
      },
    });

    if (!data) {
      throw new NotFoundException('Todo is not found');
    }

    return data;
  }

  async createTodo(dto: CreateTodoDto): Promise<Todo> {
    const todo = await this.prisma.todo.create({
      data: dto,
    });

    await this.updateCategoryProgress(dto.categoryId);

    return todo;
  }

  async editTodo(dto: EditTodoDto): Promise<Todo> {
    const todo = await this.prisma.todo.update({
      where: {
        id: dto.id,
      },
      data: dto,
    });

    await this.updateCategoryProgress(dto.categoryId);

    return todo;
  }

  async removeTodo(todoId: number): Promise<Todo> {
    const todo = await this.prisma.todo.delete({
      where: {
        id: todoId,
      },
    });

    await this.updateCategoryProgress(todo.categoryId);

    return todo;
  }

  async updateCategoryProgress(categoryId: number): Promise<void> {
    const category = await this.prisma.category.findFirst({
      where: {
        id: categoryId,
      },
      include: {
        todos: true,
      },
    });

    const totalAmount: number = category.todos.length;

    const doneAmount: number = category.todos.reduce((accumulator, current) => {
      return accumulator + Number(current.isDone);
    }, 0);

    await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        progress: Number(((doneAmount / totalAmount) * 100).toFixed(0)),
      },
    });
  }
}
