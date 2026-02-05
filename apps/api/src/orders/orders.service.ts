import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  create(data: Partial<Order>) {
    return this.ordersRepository.save(data);
  }

  findAll() {
    return this.ordersRepository.find({ relations: ['buyer', 'product'] });
  }

  findOne(id: number) {
    return this.ordersRepository.findOne({
      where: { id },
      relations: ['buyer', 'product'],
    });
  }

  update(id: number, data: Partial<Order>) {
    return this.ordersRepository.update(id, data);
  }
}
