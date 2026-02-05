import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(data: Partial<Product>) {
    return this.productsRepository.save(data);
  }

  findAll() {
    return this.productsRepository.find({ relations: ['seller'] });
  }

  findOne(id: number) {
    return this.productsRepository.findOne({
      where: { id },
      relations: ['seller'],
    });
  }

  update(id: number, data: Partial<Product>) {
    return this.productsRepository.update(id, data);
  }
}
