import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogPost, BlogPostStatus } from './entities/blog-post.entity';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll(@Query('status') status?: BlogPostStatus) {
    return this.blogService.findAll({ status });
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.blogService.findOne(slug);
  }

  // TODO: Add auth guard for mutations
  @Post()
  create(@Body() createBlogDto: Partial<BlogPost>) {
    return this.blogService.create(createBlogDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: Partial<BlogPost>) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
