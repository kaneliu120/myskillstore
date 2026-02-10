import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost, BlogPostStatus } from './entities/blog-post.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private blogRepository: Repository<BlogPost>,
  ) {}

  async findAll(query: { status?: BlogPostStatus }) {
    const where: any = {};
    if (query.status) {
      where.status = query.status;
    }
    return this.blogRepository.find({
      where,
      order: { published_at: 'DESC', created_at: 'DESC' },
    });
  }

  async findOne(slug: string) {
    const post = await this.blogRepository.findOne({ where: { slug } });
    if (!post) {
      throw new NotFoundException(`Blog post with slug "${slug}" not found`);
    }
    return post;
  }

  create(data: Partial<BlogPost>) {
    const post = this.blogRepository.create(data);
    return this.blogRepository.save(post);
  }

  async update(id: number, data: Partial<BlogPost>) {
    await this.blogRepository.update(id, data);
    return this.blogRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.blogRepository.delete(id);
  }
}
