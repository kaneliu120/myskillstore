import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { Request } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProductStatus } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: Request & { user: any }, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create({
      ...createProductDto,
      seller_id: req.user.sub,
      status: ProductStatus.PENDING_REVIEW,
    });
  }

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    if (status === 'approved') {
      return this.productsService.findApproved({ search, category });
    }
    return this.productsService.findAll({ search, category });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my/list')
  findMyProducts(@Req() req: Request & { user: any }) {
    return this.productsService.findBySeller(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Req() req: Request & { user: any }, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateBySeller(+id, req.user.sub, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req: Request & { user: any }, @Param('id') id: string) {
    return this.productsService.removeBySeller(+id, req.user.sub);
  }
}
