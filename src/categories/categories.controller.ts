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

import { CategoriesService } from './categories.service';
import { CreateCategoryDto, EditCategoryDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/')
  getAllCategories(@Req() req) {
    return this.categoriesService.getAllCategories(req.user.id);
  }

  @Get('/:categoryId')
  getCategoryById(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.getCategoryById(categoryId);
  }

  @Post('/create')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(dto);
  }

  @Put('/edit')
  editCategory(@Body() dto: EditCategoryDto) {
    return this.categoriesService.editCategory(dto);
  }

  @Delete('/:categoryId')
  removeCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.removeCategory(categoryId);
  }
}
