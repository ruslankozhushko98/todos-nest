import { NotFoundException, Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, EditCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  getAllCategories(userId: number): Promise<Array<Category>> {
    return this.prisma.category.findMany({
      where: {
        userId,
      },
    });
  }

  async getCategoryById(categoryId: number): Promise<Category> {
    const data = await this.prisma.category.findFirst({
      where: {
        id: categoryId,
      },
      include: {
        todos: true,
      },
    });

    if (!data) {
      throw new NotFoundException('Category is not found');
    }

    return data;
  }

  createCategory(dto: CreateCategoryDto): Promise<Category> {
    return this.prisma.category.create({
      data: dto,
    });
  }

  editCategory(dto: EditCategoryDto): Promise<Category> {
    return this.prisma.category.update({
      where: {
        id: dto.id,
      },
      data: dto,
    });
  }

  removeCategory(categoryId: number): Promise<Category> {
    return this.prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
}
