import { Injectable, Param } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    return product;
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    return this.productRepository.findOneBy({ id });
  }

  async update(id: string, updateProductDto: CreateProductDto) {
    const findCategories = await this.findOne(id);
    const updateProduct = await this.productRepository.merge(
      findCategories,
      updateProductDto,
    );
    return this.productRepository.save(updateProduct);
  }

  async remove(id: string) {
    const producto = await this.findOne(id);
    await this.productRepository.remove(producto);
    return 'Product removed successfully';
  }
}
