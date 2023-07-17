import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Category } from '@prisma/client';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto, EditCategoryDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/')
  getAllCategories(@Req() req): Promise<Array<Category>> {
    return this.categoriesService.getAllCategories(req.user.id);
  }

  @Get('/:categoryId')
  getCategoryById(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<Category> {
    return this.categoriesService.getCategoryById(categoryId);
  }

  @Post('/create')
  createCategory(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.createCategory(dto);
  }

  @Put('/edit')
  editCategory(@Body() dto: EditCategoryDto): Promise<Category> {
    return this.categoriesService.editCategory(dto);
  }

  @Delete('/:categoryId')
  removeCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<Category> {
    return this.categoriesService.removeCategory(categoryId);
  }
}
